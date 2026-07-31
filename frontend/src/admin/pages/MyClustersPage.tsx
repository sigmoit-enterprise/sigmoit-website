import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { clustersApi } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { useAuth } from "../auth/AuthContext";
import {
  Card,
  EmptyState,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from "../ui/primitives";

export function MyClustersPage() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useAsync(() => clustersApi.mine(), []);

  return (
    <>
      <PageHeader
        title="My Clusters"
        subtitle={`Clusters assigned to ${user?.name ?? "you"} today`}
      />

      {loading && <LoadingBlock label="Loading your clusters..." />}
      {!loading && error && <ErrorBlock message={error} onRetry={reload} />}
      {!loading && !error && data && data.length === 0 && (
        <Card>
          <EmptyState
            title="No clusters assigned today"
            description="An administrator assigns clusters each day. Check back later or ask your admin."
          />
        </Card>
      )}
      {!loading && !error && data && data.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cluster) => (
            <Link
              key={cluster.assignmentId}
              to={`/admin/leads?cluster=${cluster.clusterId}`}
              className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-sigmo-green/10 text-sigmo-green">
                <Boxes className="size-4.5" />
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-sigmo-dark group-hover:text-sigmo-green">
                {cluster.clusterName}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {cluster.leadCount} {cluster.leadCount === 1 ? "lead" : "leads"} to work through
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
