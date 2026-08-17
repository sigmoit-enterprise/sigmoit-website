# Frontend Changes: Call Status & Priority Indicators

This document details all changes made to the frontend for the **Call Status Indicator** (`[pending, completed]`) and **Priority Indicator** (`[High, Medium, Low, Not Interested, Dead, Converted]`). Use this as a reference to sync changes across environments and backends.

---

## 1. Type Definitions

**File:** `frontend/src/admin/lib/types.ts`

- Added types and constant arrays:
  ```typescript
  export type CallIndicator = "pending" | "completed";

  export type LeadPriority =
    | "high"
    | "medium"
    | "low"
    | "not_interested"
    | "dead"
    | "converted";

  export const CALL_INDICATORS: CallIndicator[] = ["pending", "completed"];

  export const LEAD_PRIORITIES: LeadPriority[] = [
    "high",
    "medium",
    "low",
    "not_interested",
    "dead",
    "converted",
  ];
  ```

- Updated `Lead` interface:
  ```typescript
  export interface Lead {
    // ...existing properties
    callStatus?: CallIndicator;
    priority?: LeadPriority;
  }
  ```

---

## 2. Formatting Helpers, Badges & Icons

**File:** `frontend/src/admin/lib/format.ts`

- Added label and styling maps for `CallIndicator` and `LeadPriority`:
  ```typescript
  export const CALL_STATUS_LABELS: Record<CallIndicator, string> = {
    pending: "Pending",
    completed: "Completed",
  };

  export const CALL_STATUS_TONES: Record<CallIndicator, string> = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  export const PRIORITY_LABELS: Record<LeadPriority, string> = {
    high: "High",
    medium: "Medium",
    low: "Low",
    not_interested: "Not Interested",
    dead: "Dead",
    converted: "Converted",
  };

  export const PRIORITY_TONES: Record<LeadPriority, string> = {
    high: "bg-rose-50 text-rose-700 ring-rose-200",
    medium: "bg-amber-50 text-amber-700 ring-amber-200",
    low: "bg-sky-50 text-sky-700 ring-sky-200",
    not_interested: "bg-slate-100 text-slate-600 ring-slate-200",
    dead: "bg-zinc-100 text-zinc-700 ring-zinc-300",
    converted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  export const PRIORITY_FLAG_COLORS: Record<LeadPriority, string> = {
    high: "text-rose-500 fill-rose-500",
    medium: "text-amber-500 fill-amber-500",
    low: "text-sky-500 fill-sky-500",
    not_interested: "text-slate-400 fill-slate-400",
    dead: "text-zinc-600 fill-zinc-600",
    converted: "text-emerald-500 fill-emerald-500",
  };
  ```

---

## 3. API Client & Filters

**File:** `frontend/src/admin/lib/api.ts`

- Extended `LeadFilters`:
  ```typescript
  export interface LeadFilters {
    // ...
    callStatus?: CallIndicator;
    priority?: LeadPriority;
  }
  ```

- Extended `CreateLeadInput`:
  ```typescript
  export type CreateLeadInput = {
    // ...
    callStatus?: CallIndicator;
    priority?: LeadPriority;
  };
  ```

- Extended `leadsApi.update`:
  ```typescript
  update: (
    id: string,
    input: Partial<CreateLeadInput> & {
      status?: LeadStatus;
      callStatus?: CallIndicator;
      priority?: LeadPriority;
      nextFollowupDate?: string | null;
    },
  ) => request<Lead>(`/leads/${id}`, { method: "PATCH", body: input }),
  ```

- Extended `callsApi.create`:
  ```typescript
  create: (
    leadId: string,
    input: {
      statusAtCall: LeadStatus;
      summary: string;
      callStatus?: CallIndicator;
      priority?: LeadPriority;
      nextFollowupDate?: string | null;
    },
  ) => request<{ callLog: CallLog; lead: Lead }>(`/leads/${leadId}/calls`, {
    method: "POST",
    body: input,
  }),
  ```

---

## 4. Leads List View (Table & Filter Controls)

**File:** `frontend/src/admin/pages/LeadsPage.tsx`

- **Search & Filter Bar:**
  - Added `Priority` filter dropdown (All, High, Medium, Low, Not Interested, Dead, Converted).
  - Added `Call Status` filter dropdown (All, Pending, Completed).
- **Table Columns:**
  - Added `<Th>Priority</Th>`
  - Added `<Th>Call</Th>`
  - Added `<Th className="text-right">Action</Th>`
- **LeadRow Rendering:**
  - Priority badge with colored flag icon.
  - Call Status badge with clock icon (Pending) or check icon (Completed).
  - Action button (`Eye` icon) to open the Lead profile on click.

---

## 5. Reassigned Leads List View

**File:** `frontend/src/admin/pages/ReassignedLeadsPage.tsx`

- Added **Priority** and **Call** columns to the reassigned / follow-up table rows.

---

## 6. Inside the Lead (Profile & Details Panel)

**File:** `frontend/src/admin/leads/LeadDetailPanel.tsx`

- **`LeadReadView` Header Placement:**
  - Positioned directly beside the **"Business Detail"** heading:
    - **Priority Pill:** Circular indicator icon with flag (`rounded-full size-7`) with tooltip showing priority.
    - **Call Status Pill:** Circular indicator icon with clock / checkmark (`rounded-full size-7`) with tooltip showing `Call Status: Pending / Completed`.
    - **Lead Status Badge:** Displayed alongside the pills.
  - Added Priority and Call Status in the details metadata section.
- **`LeadEditForm`:**
  - Added `Priority` and `Call Status` dropdown selects so both callers and admins can edit them.
  - Included `priority` and `callStatus` in the form submit payload.

---

## 7. Comment Section & Call Log Panel

**File:** `frontend/src/admin/leads/CallLogPanel.tsx`

- Renamed header to **"Comment Section"**.
- Added dropdown fields for **Call Status** (default `completed`) and **Priority**.
- Updated textarea placeholder to `"Write a call summary or note..."` with **"Send"** button.
- Submitting a comment logs the call and updates the lead's Call Status and Priority in one click.

---

## 8. Lead Profile Modal State Sync

**File:** `frontend/src/admin/leads/LeadProfileModal.tsx`

- Passes `initialPriority={lead.priority}` and `initialCallStatus={lead.callStatus}` to `CallLogPanel`.
- Updates modal lead state with new `callStatus` and `priority` when a call is logged.

---

## 9. Create Lead & CSV Import Modals

- **File:** `frontend/src/admin/leads/CreateLeadModal.tsx`
  - Added `Priority` (defaults to `medium`) and `Call Status` (defaults to `pending`) fields in a dedicated section.
- **File:** `frontend/src/admin/leads/ImportLeadsModal.tsx`
  - Added `priority` and `callStatus` columns to the downloadable CSV template header, sample row, and column hints.

---

## Summary of Files Modified

| File | Purpose |
|------|---------|
| `frontend/src/admin/lib/types.ts` | Added `CallIndicator`, `LeadPriority`, constants, updated `Lead` |
| `frontend/src/admin/lib/format.ts` | Labels, tones, and flag colors for Priority & Call Status |
| `frontend/src/admin/lib/api.ts` | Filter/Create/Update types & calls create payload |
| `frontend/src/admin/pages/LeadsPage.tsx` | Priority & Call Status filters, table columns, row badges |
| `frontend/src/admin/pages/ReassignedLeadsPage.tsx` | Priority & Call columns in follow-up list |
| `frontend/src/admin/leads/LeadDetailPanel.tsx` | Circular pills beside header in Read View & edit form fields |
| `frontend/src/admin/leads/CallLogPanel.tsx` | "Comment Section" header, Priority & Call Status controls |
| `frontend/src/admin/leads/LeadProfileModal.tsx` | Prop passing & state updating on call log |
| `frontend/src/admin/leads/CreateLeadModal.tsx` | Priority & Call Status inputs during lead creation |
| `frontend/src/admin/leads/ImportLeadsModal.tsx` | CSV template and hints updated with new fields |
