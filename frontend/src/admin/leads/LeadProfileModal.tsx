import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, Trash2, X } from "lucide-react";
import { leadsApi } from "../lib/api";
import type { CallLog, Lead } from "../lib/types";
import { useAsync, errorMessage } from "../lib/useAsync";
import { useAuth } from "../auth/AuthContext";
import { Button, ErrorBlock, LoadingBlock } from "../ui/primitives";
import { ConfirmDialog } from "../ui/Modal";
import { useToast } from "../ui/Toast";
import { CallLogPanel } from "./CallLogPanel";
import { LeadEditForm, LeadReadView } from "./LeadDetailPanel";

const EDIT_FORM_ID = "lead-profile-edit-form";

export function LeadProfileModal({
  leadId,
  onClose,
  onChanged,
}: {
  leadId: string;
  onClose: () => void;
  onChanged?: () => void;
}) {
  const { isAdmin } = useAuth();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchLead = useCallback(() => leadsApi.get(leadId), [leadId]);
  const { data: lead, loading, error, reload, setData } = useAsync(fetchLead, [leadId]);

  const calls: CallLog[] = lead?.callLogs ?? [];

  function applyLead(next: Lead, calls?: CallLog[]) {
    setData({ ...next, callLogs: calls ?? lead?.callLogs ?? [] });
    onChanged?.();
  }

  function handleCallLogged(result: { callLog: CallLog; lead: Lead }) {
    if (!lead) return;
    // The POST response lead lacks the province/district/leadBy includes, so keep
    // the loaded lead and graft on only the fields the call actually changed.
    setData({
      ...lead,
      status: result.lead.status,
      nextFollowupDate: result.lead.nextFollowupDate,
      updatedAt: result.lead.updatedAt,
      callLogs: [result.callLog, ...calls],
    });
    onChanged?.();
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await leadsApi.remove(leadId);
      toast.success("Lead deleted.");
      onChanged?.();
      onClose();
    } catch (err) {
      toast.error(errorMessage(err));
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-100 flex flex-col bg-slate-900/40 backdrop-blur-sm">
      <div className="flex min-h-0 flex-1 flex-col bg-slate-50 sm:m-4 sm:rounded-2xl sm:shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3.5 sm:rounded-t-2xl">
          <div className="flex min-w-0 items-center gap-3">
            <h2 className="truncate text-lg font-bold tracking-tight text-slate-900">
              Lead Profile
            </h2>
            {lead && (
              <span className="hidden truncate text-sm text-slate-500 sm:inline">
                {lead.businessName}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {lead && !editing && (
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="size-3.5" />
                Edit
              </Button>
            )}
            {lead && editing && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" form={EDIT_FORM_ID} size="sm" loading={saving}>
                  Save changes
                </Button>
              </>
            )}
            {lead && isAdmin && !editing && (
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:bg-rose-50"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-5" />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-h-0 overflow-y-auto p-5">
            {loading && <LoadingBlock label="Loading lead..." />}
            {!loading && error && <ErrorBlock message={error} onRetry={reload} />}
            {!loading && lead && (
              <div className="rounded-xl border-l-2 border-sigmo-green bg-white p-5 shadow-sm sm:p-6">
                {editing ? (
                  <LeadEditForm
                    lead={lead}
                    isAdmin={isAdmin}
                    formId={EDIT_FORM_ID}
                    onBusyChange={setSaving}
                    onSaved={(updated) => {
                      applyLead(updated);
                      setEditing(false);
                    }}
                  />
                ) : (
                  <LeadReadView lead={lead} />
                )}
              </div>
            )}
          </div>

          <div className="min-h-0 border-t border-slate-200 lg:border-t-0">
            {lead && (
              <CallLogPanel
                leadId={lead.id}
                calls={calls}
                onLogged={handleCallLogged}
              />
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete lead"
        danger
        confirmLabel="Delete permanently"
        loading={deleting}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        message={
          <>
            <strong className="font-semibold text-slate-800">{lead?.businessName}</strong> and its
            entire call history will be deleted. This cannot be undone.
          </>
        }
      />
    </div>,
    document.body,
  );
}
