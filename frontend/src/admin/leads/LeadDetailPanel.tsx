import { useState } from "react";
import { Building2 } from "lucide-react";
import type { Lead, LeadStatus } from "../lib/types";
import { LEAD_STATUSES, LEAD_SOURCES } from "../lib/types";
import { leadsApi } from "../lib/api";
import {
  SOURCE_LABELS,
  STATUS_LABELS,
  STATUS_TONES,
  dash,
  dateInputToIso,
  formatDate,
  formatDateTime,
  toDateInput,
} from "../lib/format";
import { useDistricts, useProvinces } from "../lib/useLocations";
import { errorMessage } from "../lib/useAsync";
import {
  Badge,
  DetailItem,
  Field,
  Input,
  SectionHeading,
  Select,
  Textarea,
} from "../ui/primitives";
import { useToast } from "../ui/Toast";

const STATUS_OPTIONS = LEAD_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }));
const SOURCE_OPTIONS = LEAD_SOURCES.map((s) => ({ value: s, label: SOURCE_LABELS[s] }));
const COUNTRY_OPTIONS = [
  { value: "Nepal", label: "Nepal" },
  { value: "International", label: "International" },
];

export function LeadReadView({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-7">
      <section>
        <div className="mb-4 flex items-center gap-3">
          <SectionHeading>Business Detail</SectionHeading>
          <Badge className={STATUS_TONES[lead.status]}>{STATUS_LABELS[lead.status]}</Badge>
        </div>

        <div className="flex gap-6">
          <span className="hidden size-20 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 sm:flex">
            <Building2 className="size-9" />
          </span>
          <dl className="grid flex-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Business Name" value={dash(lead.businessName)} />
            <DetailItem label="Business Type" value={dash(lead.businessType)} />
            <DetailItem label="Contact Person" value={dash(lead.contactPersonName)} />
            <DetailItem label="Contact Number 1" value={dash(lead.contact1)} />
            <DetailItem label="Contact Number 2" value={dash(lead.contact2)} />
            <DetailItem label="Contact Number 3" value={dash(lead.contact3)} />
            <DetailItem label="Email Address 1" value={dash(lead.email1)} />
            <DetailItem label="Email Address 2" value={dash(lead.email2)} />
          </dl>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section>
        <SectionHeading>Location Detail</SectionHeading>
        <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Country" value={dash(lead.country)} />
          <DetailItem label="Province" value={dash(lead.province?.name)} />
          <DetailItem label="District" value={dash(lead.district?.name)} />
          <DetailItem label="City / Municipality" value={dash(lead.cityMunicipality)} />
          <DetailItem label="Landmark / Area" value={dash(lead.landmarkArea)} />
          <DetailItem label="Location (free text)" value={dash(lead.locationFreeText)} />
        </dl>
      </section>

      <hr className="border-slate-200" />

      <section>
        <SectionHeading>Cluster Detail</SectionHeading>
        <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Date of Lead Generation" value={formatDate(lead.createdAt)} />
          <DetailItem label="Cluster Name" value={dash(lead.cluster?.name)} />
          <DetailItem label="Source" value={dash(SOURCE_LABELS[lead.source] ?? lead.source)} />
          <DetailItem label="Lead By" value={dash(lead.leadBy?.name)} />
          <DetailItem
            label="Next Follow-up Date"
            value={lead.nextFollowupDate ? formatDate(lead.nextFollowupDate) : dash(null)}
          />
          <DetailItem label="Last Updated" value={formatDateTime(lead.updatedAt)} />
        </dl>
      </section>

      {lead.description && (
        <>
          <hr className="border-slate-200" />
          <section>
            <SectionHeading>Description</SectionHeading>
            <p className="mt-3 text-sm whitespace-pre-wrap text-slate-700">
              {lead.description}
            </p>
          </section>
        </>
      )}
    </div>
  );
}

interface EditForm {
  businessName: string;
  businessType: string;
  contactPersonName: string;
  contact1: string;
  contact2: string;
  contact3: string;
  email1: string;
  email2: string;
  country: "Nepal" | "International";
  provinceId: string;
  districtId: string;
  cityMunicipality: string;
  locationFreeText: string;
  landmarkArea: string;
  description: string;
  status: LeadStatus;
  source: string;
  nextFollowupDate: string;
}

function toForm(lead: Lead): EditForm {
  return {
    businessName: lead.businessName ?? "",
    businessType: lead.businessType ?? "",
    contactPersonName: lead.contactPersonName ?? "",
    contact1: lead.contact1 ?? "",
    contact2: lead.contact2 ?? "",
    contact3: lead.contact3 ?? "",
    email1: lead.email1 ?? "",
    email2: lead.email2 ?? "",
    country: lead.country,
    provinceId: lead.provinceId ? String(lead.provinceId) : "",
    districtId: lead.districtId ? String(lead.districtId) : "",
    cityMunicipality: lead.cityMunicipality ?? "",
    locationFreeText: lead.locationFreeText ?? "",
    landmarkArea: lead.landmarkArea ?? "",
    description: lead.description ?? "",
    status: lead.status,
    source: lead.source,
    nextFollowupDate: toDateInput(lead.nextFollowupDate),
  };
}

/** Empty strings become null so the backend clears the column instead of storing "". */
function orNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export function LeadEditForm({
  lead,
  isAdmin,
  formId,
  onSaved,
  onBusyChange,
}: {
  lead: Lead;
  isAdmin: boolean;
  formId: string;
  onSaved: (lead: Lead) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const toast = useToast();
  const [form, setForm] = useState<EditForm>(() => toForm(lead));
  const [error, setError] = useState<string | null>(null);

  const provinces = useProvinces();
  const provinceId = form.provinceId ? Number(form.provinceId) : null;
  const districts = useDistricts(provinceId);

  const isNepal = form.country === "Nepal";

  function set<K extends keyof EditForm>(key: K, value: EditForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    onBusyChange(true);
    try {
      // BD-disallowed fields are omitted rather than sent-and-ignored.
      const payload: Record<string, unknown> = {
        contactPersonName: orNull(form.contactPersonName),
        contact1: orNull(form.contact1),
        contact2: orNull(form.contact2),
        contact3: orNull(form.contact3),
        email1: orNull(form.email1),
        email2: orNull(form.email2),
        country: form.country,
        provinceId: isNepal && form.provinceId ? Number(form.provinceId) : null,
        districtId: isNepal && form.districtId ? Number(form.districtId) : null,
        cityMunicipality: isNepal ? orNull(form.cityMunicipality) : null,
        locationFreeText: isNepal ? null : orNull(form.locationFreeText),
        landmarkArea: orNull(form.landmarkArea),
        nextFollowupDate: form.nextFollowupDate
          ? dateInputToIso(form.nextFollowupDate)
          : null,
      };

      if (isAdmin) {
        payload.businessName = form.businessName.trim();
        payload.businessType = form.businessType.trim();
        payload.description = orNull(form.description);
        payload.status = form.status;
        payload.source = form.source;
      }

      const updated = await leadsApi.update(lead.id, payload);
      toast.success("Lead updated.");
      onSaved(updated);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      onBusyChange(false);
    }
  }

  return (
    <form id={formId} onSubmit={submit} className="space-y-7">
      <section>
        <SectionHeading>Business Details</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Business Name" htmlFor="ef-bn">
            <Input
              id="ef-bn"
              required
              maxLength={200}
              disabled={!isAdmin}
              value={form.businessName}
              onChange={(e) => set("businessName", e.target.value)}
            />
          </Field>
          <Field label="Business Type" htmlFor="ef-bt">
            <Input
              id="ef-bt"
              required
              maxLength={100}
              disabled={!isAdmin}
              value={form.businessType}
              onChange={(e) => set("businessType", e.target.value)}
            />
          </Field>
          <Field label="Contact Person" htmlFor="ef-cp">
            <Input
              id="ef-cp"
              maxLength={100}
              placeholder="Contact person name"
              value={form.contactPersonName}
              onChange={(e) => set("contactPersonName", e.target.value)}
            />
          </Field>
          <Field label="Contact Number 1" htmlFor="ef-c1">
            <Input
              id="ef-c1"
              maxLength={50}
              placeholder="Contact Number 1"
              value={form.contact1}
              onChange={(e) => set("contact1", e.target.value)}
            />
          </Field>
          <Field label="Contact Number 2" htmlFor="ef-c2">
            <Input
              id="ef-c2"
              maxLength={50}
              placeholder="Contact Number 2"
              value={form.contact2}
              onChange={(e) => set("contact2", e.target.value)}
            />
          </Field>
          <Field label="Contact Number 3" htmlFor="ef-c3">
            <Input
              id="ef-c3"
              maxLength={50}
              placeholder="Contact Number 3"
              value={form.contact3}
              onChange={(e) => set("contact3", e.target.value)}
            />
          </Field>
          <Field label="Email Address 1" htmlFor="ef-e1">
            <Input
              id="ef-e1"
              type="email"
              maxLength={100}
              placeholder="Email Address 1"
              value={form.email1}
              onChange={(e) => set("email1", e.target.value)}
            />
          </Field>
          <Field label="Email Address 2" htmlFor="ef-e2">
            <Input
              id="ef-e2"
              type="email"
              maxLength={100}
              placeholder="Email Address 2"
              value={form.email2}
              onChange={(e) => set("email2", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section>
        <SectionHeading>Location Details</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Country" htmlFor="ef-country">
            <Select
              id="ef-country"
              value={form.country}
              onChange={(e) => {
                const country = e.target.value as "Nepal" | "International";
                setForm((prev) => ({
                  ...prev,
                  country,
                  ...(country === "International"
                    ? { provinceId: "", districtId: "", cityMunicipality: "" }
                    : { locationFreeText: "" }),
                }));
              }}
              options={COUNTRY_OPTIONS}
            />
          </Field>

          {isNepal ? (
            <>
              <Field label="Province" htmlFor="ef-prov">
                <Select
                  id="ef-prov"
                  value={form.provinceId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      provinceId: e.target.value,
                      districtId: "",
                    }))
                  }
                  placeholder="Select province"
                  options={provinces.map((p) => ({ value: String(p.id), label: p.name }))}
                />
              </Field>
              <Field label="District" htmlFor="ef-dist">
                <Select
                  id="ef-dist"
                  value={form.districtId}
                  disabled={!provinceId}
                  onChange={(e) => set("districtId", e.target.value)}
                  placeholder={provinceId ? "Select district" : "Select province first"}
                  options={districts.map((d) => ({ value: String(d.id), label: d.name }))}
                />
              </Field>
              <Field label="City / Municipality" htmlFor="ef-city">
                <Input
                  id="ef-city"
                  maxLength={100}
                  placeholder="City / Municipality"
                  value={form.cityMunicipality}
                  onChange={(e) => set("cityMunicipality", e.target.value)}
                />
              </Field>
            </>
          ) : (
            <Field label="Location" htmlFor="ef-lft" className="sm:col-span-2">
              <Input
                id="ef-lft"
                maxLength={200}
                placeholder="City, region, country"
                value={form.locationFreeText}
                onChange={(e) => set("locationFreeText", e.target.value)}
              />
            </Field>
          )}

          <Field label="Landmark / Area" htmlFor="ef-lm">
            <Input
              id="ef-lm"
              maxLength={200}
              placeholder="Landmark / Area"
              value={form.landmarkArea}
              onChange={(e) => set("landmarkArea", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section>
        <SectionHeading>Cluster Details</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Date of Lead Generation">
            <Input value={formatDate(lead.createdAt)} disabled readOnly />
          </Field>
          <Field label="Cluster Name" hint="auto-assigned">
            <Input value={lead.cluster?.name ?? "Unassigned"} disabled readOnly />
          </Field>
          <Field label="Status" htmlFor="ef-status">
            <Select
              id="ef-status"
              value={form.status}
              disabled={!isAdmin}
              onChange={(e) => set("status", e.target.value as LeadStatus)}
              options={STATUS_OPTIONS}
            />
          </Field>
          <Field label="Source" htmlFor="ef-source">
            <Select
              id="ef-source"
              value={form.source}
              disabled={!isAdmin}
              onChange={(e) => set("source", e.target.value)}
              options={SOURCE_OPTIONS}
            />
          </Field>
          <Field label="Next Follow-up Date" htmlFor="ef-nfd">
            <Input
              id="ef-nfd"
              type="date"
              value={form.nextFollowupDate}
              onChange={(e) => set("nextFollowupDate", e.target.value)}
            />
          </Field>
          <Field label="Lead By">
            <Input value={lead.leadBy?.name ?? "--"} disabled readOnly />
          </Field>
        </div>
      </section>

      {isAdmin && (
        <section>
          <SectionHeading>Description</SectionHeading>
          <Textarea
            className="mt-3"
            rows={3}
            maxLength={2000}
            placeholder="Notes about this lead"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            aria-label="Description"
          />
        </section>
      )}

      {!isAdmin && (
        <p className="rounded-lg bg-sky-50 px-3 py-2 text-xs text-sky-800 ring-1 ring-sky-200">
          As a BD employee you can update contact, location, and next follow-up date fields.
          Business name, status, and source are managed by an administrator.
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200">
          {error}
        </p>
      )}
    </form>
  );
}
