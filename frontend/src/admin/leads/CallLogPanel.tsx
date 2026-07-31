import { useState } from "react";
import { Send } from "lucide-react";
import { callsApi } from "../lib/api";
import type { CallLog, Lead, LeadStatus } from "../lib/types";
import {
  EMPTY,
  STATUS_LABELS,
  STATUS_TONES,
  dateInputToIso,
  formatDate,
  formatDateTime,
} from "../lib/format";
import { LEAD_STATUSES } from "../lib/types";
import { errorMessage } from "../lib/useAsync";
import { Avatar, Badge, Button, Field, Select, Textarea, Input } from "../ui/primitives";
import { useToast } from "../ui/Toast";

const STATUS_OPTIONS = LEAD_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }));

export function CallLogPanel({
  leadId,
  calls,
  onLogged,
}: {
  leadId: string;
  calls: CallLog[];
  onLogged: (result: { callLog: CallLog; lead: Lead }) => void;
}) {
  const toast = useToast();
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<LeadStatus>("contacted");
  const [followup, setFollowup] = useState("");
  const [busy, setBusy] = useState(false);

  const needsFollowup = status === "follow_up_scheduled";
  const canSend = summary.trim().length > 0 && (!needsFollowup || followup !== "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setBusy(true);
    try {
      const result = await callsApi.create(leadId, {
        statusAtCall: status,
        summary: summary.trim(),
        nextFollowupDate: needsFollowup ? dateInputToIso(followup) : null,
      });
      setSummary("");
      setFollowup("");
      onLogged(result);
      toast.success("Call logged.");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col border-l-2 border-sigmo-green bg-white">
      <header className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-base font-bold tracking-tight text-slate-900">Call Log</h3>
        <p className="mt-0.5 text-xs text-slate-500">
          {calls.length} {calls.length === 1 ? "entry" : "entries"}
        </p>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/60 px-4 py-4">
        {calls.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">
            No calls logged yet.
          </p>
        ) : (
          calls.map((call) => <CallEntry key={call.id} call={call} />)
        )}
      </div>

      <form onSubmit={submit} className="space-y-3 border-t border-slate-200 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Status at call" htmlFor="call-status">
            <Select
              id="call-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              options={STATUS_OPTIONS}
            />
          </Field>
          <Field
            label="Next follow-up"
            htmlFor="call-nfd"
            hint={needsFollowup ? "required" : undefined}
          >
            <Input
              id="call-nfd"
              type="date"
              value={followup}
              required={needsFollowup}
              disabled={!needsFollowup}
              onChange={(e) => setFollowup(e.target.value)}
            />
          </Field>
        </div>

        <div className="flex items-end gap-2">
          <Textarea
            rows={2}
            maxLength={5000}
            placeholder="Write a comment ..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            aria-label="Call summary"
          />
          <Button type="submit" loading={busy} disabled={!canSend} className="shrink-0">
            <Send className="size-3.5" />
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

function CallEntry({ call }: { call: CallLog }) {
  return (
    <article className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200/80">
      <div className="flex items-center gap-2.5">
        <Avatar name={call.calledBy?.name} className="size-8" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            {call.calledBy?.name ?? "Unknown"}
          </p>
          <p className="text-[11px] text-slate-400">{formatDateTime(call.createdAt)}</p>
        </div>
        <Badge className={STATUS_TONES[call.statusAtCall]}>
          {STATUS_LABELS[call.statusAtCall]}
        </Badge>
      </div>

      <div className="mt-3 flex items-start gap-4">
        <p className="min-w-0 flex-1 text-sm whitespace-pre-wrap text-slate-700">
          {call.summary}
        </p>
        <dl className="shrink-0 space-y-1 border-l border-slate-200 pl-4 text-[11px]">
          <div className="flex gap-2">
            <dt className="font-semibold text-slate-500">NFD:</dt>
            <dd className="text-slate-700">
              {call.nextFollowupDate ? formatDate(call.nextFollowupDate) : EMPTY}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
