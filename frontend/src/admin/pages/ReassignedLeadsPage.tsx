import { useCallback, useState } from "react";
import { leadsApi } from "../lib/api";
import {
  SOURCE_LABELS,
  STATUS_LABELS,
  STATUS_TONES,
  dash,
  formatDate,
  formatDateTime,
} from "../lib/format";
import { useAsync } from "../lib/useAsync";
import { useAuth } from "../auth/AuthContext";
import {
  Badge,
  Card,
  EmptyState,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from "../ui/primitives";
import { Table, Td, Th, Tr } from "../ui/Table";
import { LeadProfileModal } from "../leads/LeadProfileModal";

export function ReassignedLeadsPage() {
  const { isAdmin } = useAuth();
  const [openLeadId, setOpenLeadId] = useState<string | null>(null);

  const fetch = useCallback(() => leadsApi.reassigned(isAdmin), [isAdmin]);
  const { data, loading, error, reload } = useAsync(fetch, [isAdmin]);

  return (
    <>
      <PageHeader
        title="Reassigned Leads"
        subtitle={
          isAdmin
            ? "Follow-ups scheduled for today across all employees"
            : "Follow-ups scheduled for today in your assigned clusters"
        }
        actions={
          data ? (
            <Badge className="bg-amber-50 text-amber-700 ring-amber-200">
              {data.length} due today
            </Badge>
          ) : undefined
        }
      />

      <Card>
        {loading && <LoadingBlock label="Loading follow-ups..." />}
        {!loading && error && (
          <div className="p-6">
            <ErrorBlock message={error} onRetry={reload} />
          </div>
        )}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState
            title="Nothing due today"
            description="Leads with a follow-up scheduled for today will appear here."
          />
        )}
        {!loading && !error && data && data.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>Business</Th>
                <Th>Contact</Th>
                <Th>Cluster</Th>
                <Th>Follow-up</Th>
                <Th>Last call</Th>
                <Th>Source</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((lead) => {
                const lastCall = lead.callLogs?.[0];
                return (
                  <Tr
                    key={lead.id}
                    interactive
                    onDoubleClick={() => setOpenLeadId(lead.id)}
                    title="Double-click to open profile"
                  >
                    <Td>
                      <p className="font-semibold text-slate-900">{lead.businessName}</p>
                      <Badge className={`mt-1 ${STATUS_TONES[lead.status]}`}>
                        {STATUS_LABELS[lead.status]}
                      </Badge>
                    </Td>
                    <Td>
                      <p className="text-slate-700">{dash(lead.contactPersonName)}</p>
                      <p className="text-xs text-slate-500">{dash(lead.contact1)}</p>
                    </Td>
                    <Td className="text-slate-600">{dash(lead.cluster?.name)}</Td>
                    <Td className="whitespace-nowrap font-semibold text-amber-700">
                      {formatDate(lead.nextFollowupDate)}
                    </Td>
                    <Td className="max-w-64">
                      {lastCall ? (
                        <>
                          <p className="truncate text-xs text-slate-600">{lastCall.summary}</p>
                          <p className="text-[11px] text-slate-400">
                            {formatDateTime(lastCall.createdAt)}
                          </p>
                        </>
                      ) : (
                        <span className="text-slate-400">--</span>
                      )}
                    </Td>
                    <Td>
                      <Badge>{SOURCE_LABELS[lead.source] ?? lead.source}</Badge>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      {openLeadId && (
        <LeadProfileModal
          leadId={openLeadId}
          onClose={() => setOpenLeadId(null)}
          onChanged={reload}
        />
      )}
    </>
  );
}
