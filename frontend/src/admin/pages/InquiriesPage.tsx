import { useCallback, useState } from "react";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { inquiriesApi } from "../lib/api";
import type { DuplicateCandidate, InquiryStatus, WebsiteInquiry } from "../lib/types";
import { dash, formatDateTime } from "../lib/format";
import { errorMessage, useAsync } from "../lib/useAsync";
import {
  Badge,
  Button,
  Card,
  DetailItem,
  EmptyState,
  ErrorBlock,
  Field,
  LoadingBlock,
  PageHeader,
  SectionHeading,
  Select,
} from "../ui/primitives";
import { Pagination, Table, Td, Th, Tr } from "../ui/Table";
import { ConfirmDialog, Modal } from "../ui/Modal";
import { useToast } from "../ui/Toast";

const STATUS_OPTIONS = [
  { value: "pending_review", label: "Pending review" },
  { value: "promoted", label: "Promoted" },
  { value: "discarded", label: "Discarded" },
];

const STATUS_TONES: Record<InquiryStatus, string> = {
  pending_review: "bg-amber-50 text-amber-700 ring-amber-200",
  promoted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  discarded: "bg-slate-100 text-slate-500 ring-slate-200",
};

const STATUS_LABELS: Record<InquiryStatus, string> = {
  pending_review: "Pending review",
  promoted: "Promoted",
  discarded: "Discarded",
};

export function InquiriesPage() {
  const toast = useToast();
  const [status, setStatus] = useState<string>("pending_review");
  const [page, setPage] = useState(1);
  const [openInquiry, setOpenInquiry] = useState<WebsiteInquiry | null>(null);
  const [discarding, setDiscarding] = useState<WebsiteInquiry | null>(null);
  const [duplicates, setDuplicates] = useState<{
    inquiry: WebsiteInquiry;
    candidates: DuplicateCandidate[];
  } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetch = useCallback(
    () => inquiriesApi.list(status || undefined, page, 25),
    [status, page],
  );
  const { data, loading, error, reload } = useAsync(fetch, [status, page]);

  async function handlePromote(inquiry: WebsiteInquiry) {
    setBusyId(inquiry.id);
    try {
      const result = await inquiriesApi.promote(inquiry.id);
      if ("needsResolution" in result) {
        setDuplicates({ inquiry, candidates: result.duplicateCandidates });
      } else {
        toast.success(`${inquiry.businessName} promoted to a lead.`);
        await reload();
      }
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDiscard() {
    if (!discarding) return;
    setBusyId(discarding.id);
    try {
      await inquiriesApi.discard(discarding.id);
      toast.success("Inquiry discarded.");
      setDiscarding(null);
      await reload();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Website Inquiries"
        subtitle="Review public contact-form submissions and promote them into leads"
        actions={
          <Select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            placeholder="All statuses"
            options={STATUS_OPTIONS}
            className="w-44"
          />
        }
      />

      <Card>
        {loading && <LoadingBlock label="Loading inquiries..." />}
        {!loading && error && (
          <div className="p-6">
            <ErrorBlock message={error} onRetry={reload} />
          </div>
        )}
        {!loading && !error && data && data.data.length === 0 && (
          <EmptyState
            title="No inquiries here"
            description="New submissions from the public contact form will appear in this queue."
          />
        )}
        {!loading && !error && data && data.data.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Business</Th>
                  <Th>Contact</Th>
                  <Th>Submitted</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((inquiry) => (
                  <Tr
                    key={inquiry.id}
                    interactive
                    onDoubleClick={() => setOpenInquiry(inquiry)}
                    title="Double-click for detail"
                  >
                    <Td>
                      <p className="font-semibold text-slate-900">{inquiry.businessName}</p>
                      <p className="text-xs text-slate-500">{dash(inquiry.businessType)}</p>
                    </Td>
                    <Td>
                      <p className="text-slate-700">{dash(inquiry.contactPersonName)}</p>
                      <p className="text-xs text-slate-500">{dash(inquiry.contact1)}</p>
                    </Td>
                    <Td className="whitespace-nowrap text-slate-500">
                      {formatDateTime(inquiry.submittedAt)}
                    </Td>
                    <Td>
                      <Badge className={STATUS_TONES[inquiry.status]}>
                        {STATUS_LABELS[inquiry.status]}
                      </Badge>
                    </Td>
                    <Td>
                      <div className="flex items-center justify-end gap-1.5">
                        {inquiry.status === "pending_review" && (
                          <>
                            <Button
                              size="sm"
                              loading={busyId === inquiry.id}
                              onClick={() => handlePromote(inquiry)}
                            >
                              <ArrowUpRight className="size-3.5" />
                              Promote
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-rose-600 hover:bg-rose-50"
                              onClick={() => setDiscarding(inquiry)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </>
                        )}
                        {inquiry.promotedLead && (
                          <span className="text-xs text-slate-500">
                            → {inquiry.promotedLead.businessName}
                          </span>
                        )}
                      </div>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            <Pagination pagination={data.pagination} onPageChange={setPage} />
          </>
        )}
      </Card>

      {openInquiry && (
        <Modal open onClose={() => setOpenInquiry(null)} title="Inquiry detail" size="md">
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Business Name" value={dash(openInquiry.businessName)} />
            <DetailItem label="Business Type" value={dash(openInquiry.businessType)} />
            <DetailItem label="Contact Person" value={dash(openInquiry.contactPersonName)} />
            <DetailItem label="Contact Number" value={dash(openInquiry.contact1)} />
            <DetailItem label="Email" value={dash(openInquiry.email1)} />
            <DetailItem label="Submitted" value={formatDateTime(openInquiry.submittedAt)} />
            <DetailItem label="Status" value={STATUS_LABELS[openInquiry.status]} />
            <DetailItem label="Reviewed by" value={dash(openInquiry.reviewedBy?.name)} />
          </dl>
          {openInquiry.description && (
            <div className="mt-5">
              <SectionHeading>Description</SectionHeading>
              <p className="mt-2 text-sm whitespace-pre-wrap text-slate-700">
                {openInquiry.description}
              </p>
            </div>
          )}
        </Modal>
      )}

      {duplicates && (
        <ResolveDuplicatesModal
          inquiry={duplicates.inquiry}
          candidates={duplicates.candidates}
          onClose={() => setDuplicates(null)}
          onResolved={reload}
        />
      )}

      <ConfirmDialog
        open={Boolean(discarding)}
        title="Discard inquiry"
        danger
        confirmLabel="Discard"
        loading={busyId === discarding?.id}
        onClose={() => setDiscarding(null)}
        onConfirm={handleDiscard}
        message={
          <>
            <strong className="font-semibold text-slate-800">
              {discarding?.businessName}
            </strong>{" "}
            will be marked as discarded. No lead will be created.
          </>
        }
      />
    </>
  );
}

function ResolveDuplicatesModal({
  inquiry,
  candidates,
  onClose,
  onResolved,
}: {
  inquiry: WebsiteInquiry;
  candidates: DuplicateCandidate[];
  onClose: () => void;
  onResolved: () => Promise<void> | void;
}) {
  const toast = useToast();
  const [action, setAction] = useState<"skip" | "import_as_new" | "merge">("merge");
  const [existingLeadId, setExistingLeadId] = useState(candidates[0]?.leadId ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await inquiriesApi.resolvePromotion(inquiry.id, {
        action,
        existingLeadId: action === "merge" ? existingLeadId : undefined,
      });
      toast.success(res.message);
      await onResolved();
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
      title="Possible duplicate found"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="resolve-form" loading={busy}>
            Apply resolution
          </Button>
        </>
      }
    >
      <form id="resolve-form" onSubmit={submit} className="space-y-5">
        <p className="text-sm text-slate-600">
          <strong className="font-semibold text-slate-800">{inquiry.businessName}</strong> looks
          like it may already exist. Choose how to proceed.
        </p>

        <section>
          <SectionHeading>Matching leads</SectionHeading>
          <ul className="mt-3 space-y-2">
            {candidates.map((candidate) => (
              <li
                key={candidate.leadId}
                className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {candidate.businessName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Matched on {candidate.matchReason}
                  </p>
                </div>
                {action === "merge" && (
                  <input
                    type="radio"
                    name="existing-lead"
                    aria-label={`Merge into ${candidate.businessName}`}
                    checked={existingLeadId === candidate.leadId}
                    onChange={() => setExistingLeadId(candidate.leadId)}
                    className="size-4 shrink-0 border-slate-300 text-sigmo-green focus:ring-sigmo-green"
                  />
                )}
              </li>
            ))}
          </ul>
        </section>

        <Field label="Resolution" htmlFor="resolve-action">
          <Select
            id="resolve-action"
            value={action}
            onChange={(e) =>
              setAction(e.target.value as "skip" | "import_as_new" | "merge")
            }
            options={[
              { value: "merge", label: "Merge into the selected existing lead" },
              { value: "import_as_new", label: "Import as a new separate lead" },
              { value: "skip", label: "Skip (discard this inquiry)" },
            ]}
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
