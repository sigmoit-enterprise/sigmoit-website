import { useState } from "react";
import { UserPlus, UserMinus } from "lucide-react";
import { clustersApi, usersApi } from "../lib/api";
import type { AssignmentBoardRow } from "../lib/types";
import { errorMessage, useAsync } from "../lib/useAsync";
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorBlock,
  Field,
  LoadingBlock,
  PageHeader,
  Select,
} from "../ui/primitives";
import { Table, Td, Th, Tr } from "../ui/Table";
import { ConfirmDialog, Modal } from "../ui/Modal";
import { useToast } from "../ui/Toast";

export function AssignmentsPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useAsync(() => clustersApi.todayAssignments(), []);
  const { data: employees } = useAsync(() => usersApi.list("bd_employee"), []);
  const [assigning, setAssigning] = useState<AssignmentBoardRow | null>(null);
  const [unassigning, setUnassigning] = useState<AssignmentBoardRow | null>(null);
  const [busy, setBusy] = useState(false);

  const activeEmployees = (employees ?? []).filter((u) => u.isActive);
  const assignedCount = (data ?? []).filter((row) => row.currentAssignee).length;

  async function handleUnassign() {
    if (!unassigning) return;
    setBusy(true);
    try {
      await clustersApi.unassign(unassigning.clusterId);
      toast.success(`${unassigning.clusterName} is now free for reassignment.`);
      setUnassigning(null);
      await reload();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle="Today's assignment board — one active assignee per cluster per day"
        actions={
          data ? (
            <Badge className="bg-sigmo-green/10 text-sigmo-green ring-sigmo-green/25">
              {assignedCount} of {data.length} clusters assigned
            </Badge>
          ) : undefined
        }
      />

      <Card>
        {loading && <LoadingBlock label="Loading assignment board..." />}
        {!loading && error && (
          <div className="p-6">
            <ErrorBlock message={error} onRetry={reload} />
          </div>
        )}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState
            title="No clusters to assign"
            description="Clusters are created automatically as leads are added."
          />
        )}
        {!loading && !error && data && data.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>Cluster</Th>
                <Th>Leads</Th>
                <Th>Assignee today</Th>
                <Th className="text-right">Action</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <Tr key={row.clusterId}>
                  <Td className="font-semibold text-slate-900">{row.clusterName}</Td>
                  <Td className="text-slate-700">{row.leadCount}</Td>
                  <Td>
                    {row.currentAssignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={row.currentAssignee.name} className="size-6" />
                        <div>
                          <p className="text-slate-800">{row.currentAssignee.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {row.currentAssignee.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-500 ring-slate-200">
                        Unassigned
                      </Badge>
                    )}
                  </Td>
                  <Td>
                    <div className="flex justify-end">
                      {row.currentAssignee ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-50"
                          onClick={() => setUnassigning(row)}
                        >
                          <UserMinus className="size-3.5" />
                          Remove
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm" onClick={() => setAssigning(row)}>
                          <UserPlus className="size-3.5" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {assigning && (
        <AssignModal
          row={assigning}
          employees={activeEmployees.map((u) => ({ value: u.id, label: u.name }))}
          onClose={() => setAssigning(null)}
          onAssigned={reload}
        />
      )}

      <ConfirmDialog
        open={Boolean(unassigning)}
        title="Remove assignment"
        danger
        confirmLabel="Remove assignment"
        loading={busy}
        onClose={() => setUnassigning(null)}
        onConfirm={handleUnassign}
        message={
          <>
            <strong className="font-semibold text-slate-800">
              {unassigning?.currentAssignee?.name}
            </strong>{" "}
            will lose access to <strong>{unassigning?.clusterName}</strong> immediately. The
            cluster can then be reassigned today.
          </>
        }
      />
    </>
  );
}

function AssignModal({
  row,
  employees,
  onClose,
  onAssigned,
}: {
  row: AssignmentBoardRow;
  employees: { value: string; label: string }[];
  onClose: () => void;
  onAssigned: () => Promise<void> | void;
}) {
  const toast = useToast();
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!employeeId) return;
    setError(null);
    setBusy(true);
    try {
      await clustersApi.assign(row.clusterId, employeeId);
      toast.success(`${row.clusterName} assigned.`);
      await onAssigned();
      onClose();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={`Assign ${row.clusterName}`}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="assign-form" loading={busy} disabled={!employeeId}>
            Assign cluster
          </Button>
        </>
      }
    >
      <form id="assign-form" onSubmit={submit} className="space-y-4">
        <p className="text-sm text-slate-600">
          This cluster holds <strong className="font-semibold">{row.leadCount}</strong> leads.
        </p>

        <Field label="BD employee" htmlFor="assign-emp">
          <Select
            id="assign-emp"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Select an employee"
            options={employees}
            autoFocus
          />
        </Field>

        {employees.length === 0 && (
          <p className="text-xs text-amber-700">
            No active BD employees available. Create one on the Users page first.
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
