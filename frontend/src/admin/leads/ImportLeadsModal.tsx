import { useRef, useState } from "react";
import { CheckCircle2, Download, FileUp, Upload, XCircle } from "lucide-react";
import { leadsApi, type LeadImportResult } from "../lib/api";
import { errorMessage } from "../lib/useAsync";
import { Button, Field } from "../ui/primitives";
import { Modal } from "../ui/Modal";
import { useToast } from "../ui/Toast";

const TEMPLATE_HEADER =
  "businessName,businessType,contactPersonName,contact1,contact2,email1,email2,country,province,district,cityMunicipality,locationFreeText,landmarkArea,description,status,nextFollowupDate";

const SAMPLE_ROW =
  "Acme Pvt Ltd,IT Services,John Doe,9841000000,,john@acme.com,,Nepal,Bagmati,Kathmandu,Kathmandu,New Baneshwor,,Software development company,new,2026-08-05";

const COLUMN_HINTS = [
  "businessName, businessType — required",
  "province / district — use names (e.g. Bagmati / Kathmandu)",
  "country — Nepal or International",
  "status — new, contacted, follow_up_scheduled, no_response, not_interested, converted",
  "Duplicate rows are skipped automatically (matched by business name, phone, or email)",
];

export function ImportLeadsModal({
  open,
  onClose,
  onImported,
}: {
  open: boolean;
  onClose: () => void;
  onImported: () => Promise<void> | void;
}) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LeadImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function close() {
    if (busy) return;
    setFile(null);
    setResult(null);
    setError(null);
    onClose();
  }

  function downloadTemplate() {
    const blob = new Blob([`${TEMPLATE_HEADER}\n${SAMPLE_ROW}\n`], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lead_import_template.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function submit() {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await leadsApi.importCsv(file);
      setResult(res);
      if (res.imported > 0) {
        await onImported();
        toast.success(`${res.imported} lead${res.imported === 1 ? "" : "s"} imported.`);
      } else {
        toast.info("No new leads were imported from this file.");
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const hasResult = result !== null;

  return (
    <Modal
      open={open}
      onClose={close}
      title="Import leads from CSV"
      size="md"
      footer={
        hasResult ? (
          <Button onClick={close}>Done</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={close} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={submit} loading={busy} disabled={!file}>
              <Upload className="size-4" />
              Import {file ? `"${file.name}"` : "file"}
            </Button>
          </>
        )
      }
    >
      {hasResult ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-sigmo-green/10 px-3 py-4 ring-1 ring-sigmo-green/25">
              <p className="font-rajdhani text-2xl font-bold text-sigmo-green">{result.imported}</p>
              <p className="text-xs font-medium text-slate-500">Imported</p>
            </div>
            <div className="rounded-xl bg-amber-50 px-3 py-4 ring-1 ring-amber-200">
              <p className="font-rajdhani text-2xl font-bold text-amber-600">{result.duplicates}</p>
              <p className="text-xs font-medium text-slate-500">Duplicates skipped</p>
            </div>
            <div className="rounded-xl bg-rose-50 px-3 py-4 ring-1 ring-rose-200">
              <p className="font-rajdhani text-2xl font-bold text-rose-600">{result.failed}</p>
              <p className="text-xs font-medium text-slate-500">Failed</p>
            </div>
          </div>

          {result.failed > 0 && (
            <div className="rounded-xl bg-rose-50/60 p-4 ring-1 ring-rose-200">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-rose-700">
                <XCircle className="size-3.5" />
                Row errors {result.errors.length > 0 ? `(showing first ${result.errors.length})` : ""}
              </p>
              <ul className="max-h-40 space-y-1.5 overflow-y-auto">
                {result.errors.map((err, idx) => (
                  <li key={idx} className="text-xs text-rose-700">
                    <span className="font-semibold">Row {err.row}</span>
                    {err.businessName ? ` · ${err.businessName}` : ""} — {err.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.imported === 0 && result.failed === 0 && result.duplicates > 0 && (
            <p className="flex items-center gap-1.5 text-sm text-slate-600">
              <CheckCircle2 className="size-4 text-sigmo-green" />
              Every row in this file already exists in the system.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Upload a CSV file with one lead per row. New leads are added with the{" "}
            <span className="font-semibold">CSV import</span> source and automatically placed
            into clusters.
          </p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-center transition-colors hover:border-sigmo-green hover:bg-sigmo-green/5"
          >
            <FileUp className="size-6 text-sigmo-green" />
            <p className="text-sm font-medium text-slate-700">
              {file ? file.name : "Click to choose a CSV file"}
            </p>
            <p className="text-xs text-slate-400">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : "CSV files only, up to 5 MB"}
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0] ?? null;
                setFile(selected);
                setError(null);
                e.target.value = "";
              }}
            />
          </button>

          <button
            type="button"
            onClick={downloadTemplate}
            className="flex items-center gap-1.5 text-xs font-medium text-sigmo-green hover:text-emerald-700"
          >
            <Download className="size-3.5" />
            Download CSV template
          </button>

          <Field label="Supported columns">
            <ul className="space-y-1 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
              {COLUMN_HINTS.map((hint) => (
                <li key={hint} className="text-xs text-slate-600">
                  • {hint}
                </li>
              ))}
            </ul>
          </Field>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200"
            >
              {error}
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
