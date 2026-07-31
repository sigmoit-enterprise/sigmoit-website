import { useCallback, useState } from "react";
import { Plus, UserRoundX } from "lucide-react";
import { usersApi } from "../lib/api";
import type { Role, User } from "../lib/types";
import { formatDate } from "../lib/format";
import { errorMessage, useAsync } from "../lib/useAsync";
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
import { ConfirmDialog, Modal } from "../ui/Modal";
import { Table, Td, Th, Tr } from "../ui/Table";
import { useToast } from "../ui/Toast";

const ROLE_OPTIONS = [
  { value: "bd_employee", label: "BD Employee" },
  { value: "admin", label: "Admin" },
];

const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  bd_employee: "BD Employee",
};

export function UsersPage() {
  const toast = useToast();
  const [roleFilter, setRoleFilter] = useState<"" | Role>("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deactivating, setDeactivating] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchUsers = useCallback(
    () => usersApi.list(roleFilter || undefined),
    [roleFilter],
  );
  const { data, loading, error, reload } = useAsync(fetchUsers, [roleFilter]);

  async function handleDeactivate() {
    if (!deactivating) return;
    setBusy(true);
    try {
      await usersApi.deactivate(deactivating.id);
      toast.success(`${deactivating.name} has been deactivated.`);
      setDeactivating(null);
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
        title="Users"
        subtitle="Manage administrator and BD employee accounts"
        actions={
          <>
            <Select
              aria-label="Filter by role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "" | Role)}
              placeholder="All roles"
              options={ROLE_OPTIONS}
              className="w-40"
            />
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              New user
            </Button>
          </>
        }
      />

      <Card>
        {loading && <LoadingBlock label="Loading users..." />}
        {!loading && error && <div className="p-6"><ErrorBlock message={error} onRetry={reload} /></div>}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState
            title="No users found"
            description="Create a BD employee account to get started."
          />
        )}
        {!loading && !error && data && data.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <Tr key={user.id}>
                  <Td className="font-semibold text-slate-900">{user.name}</Td>
                  <Td className="text-slate-600">{user.email}</Td>
                  <Td>
                    <Badge
                      className={
                        user.role === "admin"
                          ? "bg-sigmo-green/10 text-sigmo-green ring-sigmo-green/25"
                          : undefined
                      }
                    >
                      {ROLE_LABELS[user.role]}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      className={
                        user.isActive
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : "bg-slate-100 text-slate-500 ring-slate-200"
                      }
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Td>
                  <Td className="text-slate-500">{formatDate(user.createdAt)}</Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1.5">
                      <Button variant="secondary" size="sm" onClick={() => setEditing(user)}>
                        Edit
                      </Button>
                      {user.isActive && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-50"
                          onClick={() => setDeactivating(user)}
                        >
                          <UserRoundX className="size-3.5" />
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

      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={reload}
      />

      <EditUserModal
        user={editing}
        onClose={() => setEditing(null)}
        onSaved={reload}
      />

      <ConfirmDialog
        open={Boolean(deactivating)}
        title="Deactivate user"
        danger
        confirmLabel="Deactivate"
        loading={busy}
        onClose={() => setDeactivating(null)}
        onConfirm={handleDeactivate}
        message={
          <>
            <strong className="font-semibold text-slate-800">{deactivating?.name}</strong> will
            no longer be able to sign in. Their call and assignment history is preserved.
          </>
        }
      />
    </>
  );
}

function CreateUserModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void> | void;
}) {
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "bd_employee" as Role,
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function close() {
    setForm({ name: "", email: "", password: "", role: "bd_employee" });
    setError(null);
    onClose();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await usersApi.create({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      toast.success(`${form.name.trim()} was created.`);
      await onCreated();
      close();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Create user"
      footer={
        <>
          <Button variant="secondary" onClick={close} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="create-user-form" loading={busy}>
            Create user
          </Button>
        </>
      }
    >
      <form id="create-user-form" onSubmit={submit} className="space-y-4">
        <Field label="Full name" htmlFor="cu-name">
          <Input
            id="cu-name"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>

        <Field label="Email address" htmlFor="cu-email">
          <Input
            id="cu-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="cu-password"
          hint="min 8 chars, 1 uppercase, 1 lowercase, 1 number"
        >
          <Input
            id="cu-password"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Field>

        <Field label="Role" htmlFor="cu-role">
          <Select
            id="cu-role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            options={ROLE_OPTIONS}
          />
        </Field>

        {error && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}

function EditUserModal({
  user,
  onClose,
  onSaved,
}: {
  user: User | null;
  onClose: () => void;
  onSaved: () => Promise<void> | void;
}) {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Remount on user change so the form always reflects the selected row.
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "bd_employee" as Role,
    isActive: true,
    password: "",
  });
  const [loadedId, setLoadedId] = useState<string | null>(null);

  if (user && loadedId !== user.id) {
    setLoadedId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      password: "",
    });
    setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setBusy(true);
    try {
      await usersApi.update(user.id, {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        isActive: form.isActive,
        password: form.password.trim() || undefined,
      });
      toast.success("User updated.");
      await onSaved();
      onClose();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={Boolean(user)}
      onClose={onClose}
      title="Edit user"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="edit-user-form" loading={busy}>
            Save changes
          </Button>
        </>
      }
    >
      <form id="edit-user-form" onSubmit={submit} className="space-y-4">
        <Field label="Full name" htmlFor="eu-name">
          <Input
            id="eu-name"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>

        <Field label="Email address" htmlFor="eu-email">
          <Input
            id="eu-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>

        <Field label="Role" htmlFor="eu-role">
          <Select
            id="eu-role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            options={ROLE_OPTIONS}
          />
        </Field>

        <Field
          label="New password"
          htmlFor="eu-password"
          hint="leave blank to keep current password · min 8 chars, 1 uppercase, 1 lowercase, 1 number"
        >
          <Input
            id="eu-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Field>

        <label className="flex items-center gap-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="size-4 rounded border-slate-300 text-sigmo-green focus:ring-sigmo-green"
          />
          Account is active
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
