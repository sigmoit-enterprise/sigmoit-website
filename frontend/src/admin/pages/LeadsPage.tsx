import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, Plus, RotateCcw, Search, Upload } from "lucide-react";
import { clustersApi, leadsApi, usersApi, type LeadFilters } from "../lib/api";
import { LEAD_SOURCES, LEAD_STATUSES, type Lead, type LeadStatus } from "../lib/types";
import {
  SOURCE_LABELS,
  STATUS_LABELS,
  STATUS_TONES,
  dash,
  formatDate,
  locationLabel,
} from "../lib/format";
import { errorMessage, useAsync, useDebounced } from "../lib/useAsync";
import { useDistricts, useProvinces } from "../lib/useLocations";
import { useAuth } from "../auth/AuthContext";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorBlock,
  Field,
  Input,
  LoadingBlock,
  PageHeader,
  Select,
} from "../ui/primitives";
import { Pagination, Table, Td, Th, Tr } from "../ui/Table";
import { useToast } from "../ui/Toast";
import { LeadProfileModal } from "../leads/LeadProfileModal";
import { CreateLeadModal } from "../leads/CreateLeadModal";
import { ImportLeadsModal } from "../leads/ImportLeadsModal";

const STATUS_OPTIONS = LEAD_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }));
const SOURCE_OPTIONS = LEAD_SOURCES.map((s) => ({ value: s, label: SOURCE_LABELS[s] }));
const COUNTRY_OPTIONS = [
  { value: "Nepal", label: "Nepal" },
  { value: "International", label: "International" },
];

interface FilterState {
  q: string;
  status: string;
  source: string;
  country: string;
  clusterId: string;
  provinceId: string;
  districtId: string;
  assigneeToday: string;
  leadBy: string;
  nextFollowupDate: string;
}

const NO_FILTERS: FilterState = {
  q: "",
  status: "",
  source: "",
  country: "",
  clusterId: "",
  provinceId: "",
  districtId: "",
  assigneeToday: "",
  leadBy: "",
  nextFollowupDate: "",
};

export function LeadsPage() {
  const { isAdmin } = useAuth();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(NO_FILTERS);
  const [page, setPage] = useState(1);
  const [openLeadId, setOpenLeadId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Support deep links like /admin/leads?cluster=... (used by My Clusters).
  useEffect(() => {
    const cluster = searchParams.get("cluster");
    if (cluster) {
      setFilters((prev) => ({ ...prev, clusterId: cluster }));
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedQ = useDebounced(filters.q);

  const provinces = useProvinces();
  const provinceId = filters.provinceId ? Number(filters.provinceId) : null;
  const districts = useDistricts(provinceId);

  // Filter dropdown sources. BD users can't call these admin-only endpoints.
  const { data: clusters } = useAsync(
    () => (isAdmin ? clustersApi.list() : Promise.resolve([])),
    [isAdmin],
  );
  const { data: employees } = useAsync(
    () => (isAdmin ? usersApi.list() : Promise.resolve([])),
    [isAdmin],
  );

  const query = useMemo<LeadFilters>(
    () => ({
      page,
      limit: 25,
      q: debouncedQ.trim() || undefined,
      status: (filters.status || undefined) as LeadStatus | undefined,
      source: filters.source || undefined,
      country: filters.country || undefined,
      clusterId: filters.clusterId || undefined,
      provinceId: filters.provinceId ? Number(filters.provinceId) : undefined,
      districtId: filters.districtId ? Number(filters.districtId) : undefined,
      assigneeToday: filters.assigneeToday || undefined,
      leadBy: filters.leadBy || undefined,
      nextFollowupDate: filters.nextFollowupDate || undefined,
    }),
    [page, debouncedQ, filters],
  );

  const fetchLeads = useCallback(() => leadsApi.list(query), [query]);
  const { data, loading, error, reload } = useAsync(fetchLeads, [query]);

  // Any filter change invalidates the current page number.
  useEffect(() => {
    setPage(1);
  }, [
    debouncedQ,
    filters.status,
    filters.source,
    filters.country,
    filters.clusterId,
    filters.provinceId,
    filters.districtId,
    filters.assigneeToday,
    filters.leadBy,
    filters.nextFollowupDate,
  ]);

  function set<K extends keyof FilterState>(key: K, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // District is meaningless once its province changes.
      ...(key === "provinceId" ? { districtId: "" } : null),
    }));
  }

  const activeFilterCount = Object.entries(filters).filter(
    ([, value]) => value !== "",
  ).length;

  async function handleExport() {
    setExporting(true);
    try {
      const csv = await leadsApi.exportCsv({ ...query, page: undefined, limit: undefined });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads_export.csv";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Export downloaded.");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Double-click any row to open the lead profile"
        actions={
          isAdmin ? (
            <>
              <Button variant="secondary" onClick={handleExport} loading={exporting}>
                <Download className="size-4" />
                Export CSV
              </Button>
              <Button variant="secondary" onClick={() => setImportOpen(true)}>
                <Upload className="size-4" />
                Import CSV
              </Button>
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="size-4" />
                New lead
              </Button>
            </>
          ) : undefined
        }
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Search" className="lg:col-span-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Business name, contact, or email"
                className="pl-9"
                value={filters.q}
                onChange={(e) => set("q", e.target.value)}
              />
            </div>
          </Field>

          <Field label="Status">
            <Select
              value={filters.status}
              onChange={(e) => set("status", e.target.value)}
              placeholder="All statuses"
              options={STATUS_OPTIONS}
            />
          </Field>

          <Field label="Source">
            <Select
              value={filters.source}
              onChange={(e) => set("source", e.target.value)}
              placeholder="All sources"
              options={SOURCE_OPTIONS}
            />
          </Field>

          <Field label="Country">
            <Select
              value={filters.country}
              onChange={(e) => set("country", e.target.value)}
              placeholder="All countries"
              options={COUNTRY_OPTIONS}
            />
          </Field>

          <Field label="Province">
            <Select
              value={filters.provinceId}
              onChange={(e) => set("provinceId", e.target.value)}
              placeholder="All provinces"
              options={provinces.map((p) => ({ value: String(p.id), label: p.name }))}
            />
          </Field>

          <Field label="District">
            <Select
              value={filters.districtId}
              disabled={!provinceId}
              onChange={(e) => set("districtId", e.target.value)}
              placeholder={provinceId ? "All districts" : "Select province first"}
              options={districts.map((d) => ({ value: String(d.id), label: d.name }))}
            />
          </Field>

          <Field label="Follow-up date">
            <Input
              type="date"
              value={filters.nextFollowupDate}
              onChange={(e) => set("nextFollowupDate", e.target.value)}
            />
          </Field>

          {isAdmin && (
            <>
              <Field label="Cluster">
                <Select
                  value={filters.clusterId}
                  onChange={(e) => set("clusterId", e.target.value)}
                  placeholder="All clusters"
                  options={(clusters ?? []).map((c) => ({ value: c.id, label: c.name }))}
                />
              </Field>

              <Field label="Assignee today">
                <Select
                  value={filters.assigneeToday}
                  onChange={(e) => set("assigneeToday", e.target.value)}
                  placeholder="Anyone"
                  options={(employees ?? [])
                    .filter((u) => u.role === "bd_employee")
                    .map((u) => ({ value: u.id, label: u.name }))}
                />
              </Field>

              <Field label="Lead by">
                <Select
                  value={filters.leadBy}
                  onChange={(e) => set("leadBy", e.target.value)}
                  placeholder="Anyone"
                  options={(employees ?? []).map((u) => ({ value: u.id, label: u.name }))}
                />
              </Field>
            </>
          )}

          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              disabled={activeFilterCount === 0}
              onClick={() => setFilters(NO_FILTERS)}
            >
              <RotateCcw className="size-3.5" />
              Reset{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        {loading && <LoadingBlock label="Loading leads..." />}
        {!loading && error && (
          <div className="p-6">
            <ErrorBlock message={error} onRetry={reload} />
          </div>
        )}
        {!loading && !error && data && data.data.length === 0 && (
          <EmptyState
            title="No leads match these filters"
            description="Try clearing a filter or widening your search."
            action={
              activeFilterCount > 0 ? (
                <Button variant="secondary" size="sm" onClick={() => setFilters(NO_FILTERS)}>
                  Reset filters
                </Button>
              ) : undefined
            }
          />
        )}
        {!loading && !error && data && data.data.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Business</Th>
                  <Th>Contact</Th>
                  <Th>Location</Th>
                  <Th>Cluster</Th>
                  <Th>Status</Th>
                  <Th>Next Follow-up</Th>
                  <Th>Source</Th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} onOpen={() => setOpenLeadId(lead.id)} />
                ))}
              </tbody>
            </Table>
            <Pagination pagination={data.pagination} onPageChange={setPage} />
          </>
        )}
      </Card>

      {openLeadId && (
        <LeadProfileModal
          leadId={openLeadId}
          onClose={() => setOpenLeadId(null)}
          onChanged={reload}
        />
      )}

      <CreateLeadModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={reload}
      />

      <ImportLeadsModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImported={reload}
      />
    </>
  );
}

function LeadRow({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  return (
    <Tr interactive onDoubleClick={onOpen} title="Double-click to open profile">
      <Td>
        <p className="font-semibold text-slate-900">{lead.businessName}</p>
        <p className="text-xs text-slate-500">{dash(lead.businessType)}</p>
      </Td>
      <Td>
        <p className="text-slate-700">{dash(lead.contactPersonName)}</p>
        <p className="text-xs text-slate-500">{dash(lead.contact1)}</p>
      </Td>
      <Td className="max-w-48 text-slate-600">{locationLabel(lead)}</Td>
      <Td className="text-slate-600">{dash(lead.cluster?.name)}</Td>
      <Td>
        <Badge className={STATUS_TONES[lead.status]}>{STATUS_LABELS[lead.status]}</Badge>
      </Td>
      <Td className="whitespace-nowrap text-slate-600">
        {lead.nextFollowupDate ? formatDate(lead.nextFollowupDate) : dash(null)}
      </Td>
      <Td>
        <Badge>{SOURCE_LABELS[lead.source] ?? lead.source}</Badge>
      </Td>
    </Tr>
  );
}
