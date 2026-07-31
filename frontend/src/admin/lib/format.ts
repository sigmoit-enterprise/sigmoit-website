import type { LeadStatus } from "./types";

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  follow_up_scheduled: "Follow-up Scheduled",
  no_response: "No Response",
  not_interested: "Not Interested",
  converted: "Converted",
};

export const STATUS_TONES: Record<LeadStatus, string> = {
  new: "bg-slate-100 text-slate-700 ring-slate-200",
  contacted: "bg-sky-50 text-sky-700 ring-sky-200",
  follow_up_scheduled: "bg-amber-50 text-amber-700 ring-amber-200",
  no_response: "bg-orange-50 text-orange-700 ring-orange-200",
  not_interested: "bg-rose-50 text-rose-700 ring-rose-200",
  converted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export const SOURCE_LABELS: Record<string, string> = {
  manual: "Manual",
  website: "Website",
  csv_import: "CSV Import",
};

export const EMPTY = "--";

export function dash(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return EMPTY;
  const str = String(value).trim();
  return str.length ? str : EMPTY;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return EMPTY;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return EMPTY;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return EMPTY;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return EMPTY;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** yyyy-mm-dd for <input type="date"> */
export function toDateInput(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

/** The backend validates with z.string().datetime(), so a bare date needs widening. */
export function dateInputToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function initials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_TONES = [
  "bg-violet-600",
  "bg-emerald-600",
  "bg-sky-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-teal-600",
];

export function avatarTone(seed: string | null | undefined): string {
  if (!seed) return AVATAR_TONES[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

export function locationLabel(lead: {
  country: string;
  province: { name: string } | null;
  district: { name: string } | null;
  cityMunicipality: string | null;
  locationFreeText: string | null;
}): string {
  if (lead.country === "International") return dash(lead.locationFreeText);
  const parts = [lead.cityMunicipality, lead.district?.name, lead.province?.name].filter(
    (p): p is string => Boolean(p && p.trim()),
  );
  return parts.length ? parts.join(", ") : EMPTY;
}
