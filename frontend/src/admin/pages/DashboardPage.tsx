import { useCallback, useState } from "react";
import { CalendarClock, Globe, PhoneCall, Target } from "lucide-react";
import { dashboardApi } from "../lib/api";
import type { EmployeeMetrics, LeadStatus } from "../lib/types";
import { LEAD_STATUSES, type DashboardSummary } from "../lib/types";
import { STATUS_LABELS, STATUS_TONES, dash, formatDateTime } from "../lib/format";
import { useAsync } from "../lib/useAsync";
import {
  Avatar,
  Badge,
  Card,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
  SectionHeading,
} from "../ui/primitives";
import { Table, Td, Th, Tr } from "../ui/Table";
import { Modal } from "../ui/Modal";

export function DashboardPage() {
  const { data, loading, error, reload } = useAsync(() => dashboardApi.summary(), []);
  const [drillEmployee, setDrillEmployee] = useState<EmployeeMetrics | null>(null);

  if (loading) return <LoadingBlock label="Loading dashboard..." />;
  if (error) return <ErrorBlock message={error} onRetry={reload} />;
  if (!data) return null;

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Today's snapshot across the team" />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Due today"
          value={data.system.dueToday}
          icon={CalendarClock}
          tone="bg-amber-50 text-amber-700"
        />
        <StatTile
          label="Calls completed today"
          value={data.system.callsCompletedToday}
          icon={PhoneCall}
          tone="bg-sky-50 text-sky-700"
        />
        <StatTile
          label="Completion rate"
          value={`${data.system.completionRate}%`}
          icon={Target}
          tone="bg-emerald-50 text-emerald-700"
        />
        <StatTile
          label="Pending inquiries"
          value={data.system.pendingWebsiteInquiries}
          icon={Globe}
          tone="bg-sigmo-green/10 text-sigmo-green"
        />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <StatusFunnel funnel={data.statusFunnel} />
        <ClusterBoard clusters={data.clusters} />
      </div>

      <Card>
        <div className="border-b border-slate-200 px-5 py-4">
          <SectionHeading>Employee performance</SectionHeading>
          <p className="mt-0.5 text-xs text-slate-500">
            Double-click a row for a detailed drill-down
          </p>
        </div>
        {data.employees.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-400">
            No active BD employees.
          </p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Employee</Th>
                <Th className="text-right">Due today</Th>
                <Th className="text-right">Active workload</Th>
                <Th className="text-right">Calls today</Th>
                <Th className="text-right">Completion</Th>
              </tr>
            </thead>
            <tbody>
              {data.employees.map((emp) => (
                <Tr
                  key={emp.employeeId}
                  interactive
                  onDoubleClick={() => setDrillEmployee(emp)}
                  title="Double-click for details"
                >
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={emp.employeeName} className="size-7" />
                      <span className="font-semibold text-slate-900">{emp.employeeName}</span>
                    </div>
                  </Td>
                  <Td className="text-right text-slate-700">{emp.dueToday}</Td>
                  <Td className="text-right text-slate-700">{emp.activeWorkload}</Td>
                  <Td className="text-right text-slate-700">{emp.callsCompletedToday}</Td>
                  <Td className="text-right">
                    <CompletionBadge value={emp.completionRate} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {drillEmployee && (
        <EmployeeDrilldownModal
          employee={drillEmployee}
          onClose={() => setDrillEmployee(null)}
        />
      )}
    </>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  icon: typeof Target;
  tone: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      </div>
    </Card>
  );
}

function CompletionBadge({ value }: { value: number }) {
  const tone =
    value >= 80
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : value >= 40
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : "bg-rose-50 text-rose-700 ring-rose-200";
  return <Badge className={tone}>{value}%</Badge>;
}

function StatusFunnel({ funnel }: { funnel: DashboardSummary["statusFunnel"] }) {
  const counts = new Map(funnel.map((f) => [f.status, f.count]));
  const max = Math.max(1, ...funnel.map((f) => f.count));

  return (
    <Card className="p-5">
      <SectionHeading>Status funnel</SectionHeading>
      <ul className="mt-4 space-y-3">
        {LEAD_STATUSES.map((status) => {
          const count = counts.get(status) ?? 0;
          return (
            <li key={status}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">{STATUS_LABELS[status]}</span>
                <span className="font-semibold text-slate-900">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${BAR_TONES[status]}`}
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

const BAR_TONES: Record<LeadStatus, string> = {
  new: "bg-slate-400",
  contacted: "bg-sky-500",
  follow_up_scheduled: "bg-amber-500",
  no_response: "bg-orange-500",
  not_interested: "bg-rose-500",
  converted: "bg-emerald-500",
};

function ClusterBoard({ clusters }: { clusters: DashboardSummary["clusters"] }) {
  return (
    <Card className="flex flex-col p-5">
      <SectionHeading>Today's cluster board</SectionHeading>
      {clusters.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">No clusters yet.</p>
      ) : (
        <ul className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
          {clusters.map((cluster) => (
            <li
              key={cluster.clusterId}
              className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {cluster.clusterName}
                </p>
                <p className="text-[11px] text-slate-500">
                  {cluster.leadCount} leads · {cluster.leadsCalledToday} called today
                </p>
              </div>
              {cluster.currentAssignee ? (
                <div className="flex shrink-0 items-center gap-2">
                  <Avatar name={cluster.currentAssignee.name} className="size-6" />
                  <span className="hidden text-xs font-medium text-slate-600 sm:inline">
                    {cluster.currentAssignee.name}
                  </span>
                </div>
              ) : (
                <Badge className="bg-slate-100 text-slate-500 ring-slate-200">Unassigned</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function EmployeeDrilldownModal({
  employee,
  onClose,
}: {
  employee: EmployeeMetrics;
  onClose: () => void;
}) {
  const fetch = useCallback(
    () => dashboardApi.employee(employee.employeeId),
    [employee.employeeId],
  );
  const { data, loading, error, reload } = useAsync(fetch, [employee.employeeId]);

  return (
    <Modal open onClose={onClose} title={employee.employeeName} size="lg">
      {loading && <LoadingBlock />}
      {!loading && error && <ErrorBlock message={error} onRetry={reload} />}
      {!loading && data && (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-4">
            <MiniStat label="Due today" value={data.dueToday} />
            <MiniStat label="Active workload" value={data.activeWorkload} />
            <MiniStat label="Calls today" value={data.callsCompletedToday} />
            <MiniStat label="Completion" value={`${data.completionRate}%`} />
          </div>

          <section>
            <SectionHeading>Clusters assigned today</SectionHeading>
            {data.clusters.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No clusters assigned today.</p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {data.clusters.map((c) => (
                  <li key={c.clusterId}>
                    <Badge className="bg-sigmo-green/10 text-sigmo-green ring-sigmo-green/25">
                      {c.clusterName} · {c.leadCount} leads
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <SectionHeading>Recent calls</SectionHeading>
            {data.recentCalls.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No calls logged yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {data.recentCalls.map((call) => (
                  <li
                    key={call.id}
                    className="rounded-lg bg-slate-50 px-3.5 py-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {dash(call.lead?.businessName)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge className={STATUS_TONES[call.statusAtCall]}>
                          {STATUS_LABELS[call.statusAtCall]}
                        </Badge>
                        <span className="text-[11px] text-slate-400">
                          {formatDateTime(call.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs whitespace-pre-wrap text-slate-600">
                      {call.summary}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </Modal>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
