import { useCallback, useState } from "react";
import { Boxes } from "lucide-react";
import { clustersApi } from "../lib/api";
import { LEAD_STATUSES, type ClusterSummary } from "../lib/types";
import { STATUS_LABELS, STATUS_TONES, formatDate } from "../lib/format";
import { useAsync } from "../lib/useAsync";
import {
  Avatar,
  Badge,
  Card,
  DetailItem,
  EmptyState,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
  SectionHeading,
} from "../ui/primitives";
import { Table, Td, Th, Tr } from "../ui/Table";
import { Modal } from "../ui/Modal";

const CLUSTER_CAPACITY = 31;

export function ClustersPage() {
  const { data, loading, error, reload } = useAsync(() => clustersApi.list(), []);
  const [openCluster, setOpenCluster] = useState<ClusterSummary | null>(null);

  return (
    <>
      <PageHeader
        title="Clusters"
        subtitle="Clusters are created and filled automatically as leads are added"
      />

      <Card>
        {loading && <LoadingBlock label="Loading clusters..." />}
        {!loading && error && (
          <div className="p-6">
            <ErrorBlock message={error} onRetry={reload} />
          </div>
        )}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState
            title="No clusters yet"
            description="Clusters appear automatically once leads are created."
          />
        )}
        {!loading && !error && data && data.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>Cluster</Th>
                <Th>Leads</Th>
                <Th>Capacity</Th>
                <Th>Assignee today</Th>
                <Th>Created</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((cluster) => (
                <Tr
                  key={cluster.id}
                  interactive
                  onDoubleClick={() => setOpenCluster(cluster)}
                  title="Double-click for cluster detail"
                >
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex size-7 items-center justify-center rounded-lg bg-sigmo-green/10 text-sigmo-green">
                        <Boxes className="size-3.5" />
                      </span>
                      <span className="font-semibold text-slate-900">{cluster.name}</span>
                    </div>
                  </Td>
                  <Td className="text-slate-700">{cluster.leadCount}</Td>
                  <Td>
                    <CapacityBar count={cluster.leadCount} remaining={cluster.capacityRemaining} />
                  </Td>
                  <Td>
                    {cluster.currentAssignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={cluster.currentAssignee.name} className="size-6" />
                        <span className="text-slate-700">{cluster.currentAssignee.name}</span>
                      </div>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-500 ring-slate-200">
                        Unassigned
                      </Badge>
                    )}
                  </Td>
                  <Td className="whitespace-nowrap text-slate-500">
                    {formatDate(cluster.createdAt)}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {openCluster && (
        <ClusterDetailModal cluster={openCluster} onClose={() => setOpenCluster(null)} />
      )}
    </>
  );
}

function CapacityBar({ count, remaining }: { count: number; remaining: number }) {
  const pct = Math.min(100, (count / CLUSTER_CAPACITY) * 100);
  const full = remaining === 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${full ? "bg-rose-500" : "bg-sigmo-green"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs whitespace-nowrap text-slate-500">
        {full ? "Full" : `${remaining} free`}
      </span>
    </div>
  );
}

function ClusterDetailModal({
  cluster,
  onClose,
}: {
  cluster: ClusterSummary;
  onClose: () => void;
}) {
  const fetch = useCallback(() => clustersApi.get(cluster.id), [cluster.id]);
  const { data, loading, error, reload } = useAsync(fetch, [cluster.id]);

  return (
    <Modal open onClose={onClose} title={cluster.name} size="lg">
      {loading && <LoadingBlock />}
      {!loading && error && <ErrorBlock message={error} onRetry={reload} />}
      {!loading && data && (
        <div className="space-y-6">
          <dl className="grid gap-4 sm:grid-cols-4">
            <DetailItem label="Total leads" value={data.leadCount} />
            <DetailItem label="Called today" value={data.calledToday} />
            <DetailItem label="Upcoming follow-ups" value={data.upcomingFollowups} />
            <DetailItem
              label="Assignee today"
              value={data.currentAssignee?.name ?? "Unassigned"}
            />
          </dl>

          <section>
            <SectionHeading>Leads by status</SectionHeading>
            <ul className="mt-3 flex flex-wrap gap-2">
              {LEAD_STATUSES.map((status) => (
                <li key={status}>
                  <Badge className={STATUS_TONES[status]}>
                    {STATUS_LABELS[status]}: {data.statusBreakdown[status] ?? 0}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>

          {data.assignmentHistory && data.assignmentHistory.length > 0 && (
            <section>
              <SectionHeading>Assignment history</SectionHeading>
              <ul className="mt-3 space-y-2">
                {data.assignmentHistory.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3.5 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar name={entry.employee.name} className="size-6" />
                      <span className="text-sm font-semibold text-slate-800">
                        {entry.employee.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{formatDate(entry.assignedDate)}</span>
                      <span>·</span>
                      <span>by {entry.assignedBy.name}</span>
                      {entry.removedAt && (
                        <Badge className="bg-slate-100 text-slate-500 ring-slate-200">
                          Removed
                        </Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </Modal>
  );
}
