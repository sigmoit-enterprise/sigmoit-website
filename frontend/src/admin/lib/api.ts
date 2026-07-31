import type {
  AssignmentBoardRow,
  CallLog,
  ClusterDetail,
  ClusterSummary,
  DashboardSummary,
  District,
  DuplicateCandidate,
  EmployeeDashboard,
  Lead,
  LeadStatus,
  MyCluster,
  Paged,
  Province,
  Role,
  User,
  WebsiteInquiry,
} from "./types";

export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api";

const ACCESS_KEY = "sig_access_token";
const REFRESH_KEY = "sig_refresh_token";
const USER_KEY = "sig_user";

export const tokenStore = {
  get access() {
    return localStorage.getItem(ACCESS_KEY);
  },
  get refresh() {
    return localStorage.getItem(REFRESH_KEY);
  },
  get user(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
  save(access: string, refresh: string, user: User) {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  setAccess(access: string, refresh: string) {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/** Fired when refresh fails, so the auth layer can drop the session. */
const sessionExpiredListeners = new Set<() => void>();
export function onSessionExpired(fn: () => void) {
  sessionExpiredListeners.add(fn);
  return () => sessionExpiredListeners.delete(fn);
}

let refreshInFlight: Promise<string | null> | null = null;

async function runRefresh(): Promise<string | null> {
  const refresh_token = tokenStore.refresh;
  if (!refresh_token) return null;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) return null;
  const body = (await res.json()) as {
    access_token: string;
    refresh_token: string;
  };
  tokenStore.setAccess(body.access_token, body.refresh_token);
  return body.access_token;
}

function refreshAccessToken(): Promise<string | null> {
  refreshInFlight ??= runRefresh().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  query?: Record<string, string | number | undefined | null>;
  auth?: boolean;
  raw?: boolean;
}

function buildUrl(path: string, query?: RequestOptions["query"]) {
  const url = `${API_BASE}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

async function toApiError(res: Response) {
  let code = "UNKNOWN";
  let message = res.statusText || "Request failed";
  try {
    const body = await res.json();
    if (body?.error) {
      code = body.error.code ?? code;
      message = body.error.message ?? message;
    }
  } catch {
    /* non-JSON error body */
  }
  return new ApiError(code, message, res.status);
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, auth = true, raw = false } = options;

  const send = async (token: string | null) => {
    const headers: Record<string, string> = {};
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(buildUrl(path, query), {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
    });
  };

  let res = await send(auth ? tokenStore.access : null);

  if (res.status === 401 && auth && tokenStore.refresh) {
    const fresh = await refreshAccessToken();
    if (fresh) {
      res = await send(fresh);
    } else {
      tokenStore.clear();
      sessionExpiredListeners.forEach((fn) => fn());
      throw new ApiError("SESSION_EXPIRED", "Your session has expired. Please sign in again.", 401);
    }
  }

  if (!res.ok) throw await toApiError(res);
  if (raw) return (await res.text()) as T;
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<{ access_token: string; refresh_token: string; user: User }>(
      "/auth/login",
      { method: "POST", body: { email, password }, auth: false },
    ),
  logout: (refresh_token: string) =>
    request<{ message: string }>("/auth/logout", {
      method: "POST",
      body: { refresh_token },
    }),
};

// ─── Users ───────────────────────────────────────────────────────────────────

export const usersApi = {
  list: (role?: Role) => request<User[]>("/users", { query: { role } }),
  get: (id: string) => request<User>(`/users/${id}`),
  create: (input: { name: string; email: string; password: string; role: Role }) =>
    request<User>("/users", { method: "POST", body: input }),
  update: (
    id: string,
    input: Partial<{ name: string; email: string; role: Role; isActive: boolean; password: string }>,
  ) => request<User>(`/users/${id}`, { method: "PATCH", body: input }),
  deactivate: (id: string) =>
    request<{ message: string }>(`/users/${id}`, { method: "DELETE" }),
};

// ─── Locations ───────────────────────────────────────────────────────────────

export const locationsApi = {
  provinces: () => request<Province[]>("/locations/provinces"),
  districts: (provinceId: number) =>
    request<District[]>(`/locations/provinces/${provinceId}/districts`),
};

// ─── Leads ───────────────────────────────────────────────────────────────────

export interface LeadFilters {
  page?: number;
  limit?: number;
  clusterId?: string;
  status?: LeadStatus;
  source?: string;
  country?: string;
  provinceId?: number;
  districtId?: number;
  assigneeToday?: string;
  nextFollowupDate?: string;
  leadBy?: string;
  q?: string;
}

export type CreateLeadInput = {
  businessName: string;
  businessType: string;
  contactPersonName?: string | null;
  contact1?: string | null;
  contact2?: string | null;
  contact3?: string | null;
  email1?: string | null;
  email2?: string | null;
  country: "Nepal" | "International";
  provinceId?: number | null;
  districtId?: number | null;
  cityMunicipality?: string | null;
  locationFreeText?: string | null;
  landmarkArea?: string | null;
  description?: string | null;
  source?: string;
};

export interface LeadImportResult {
  total: number;
  imported: number;
  duplicates: number;
  failed: number;
  errors: { row: number; businessName: string; error: string }[];
}

export const leadsApi = {
  list: (filters: LeadFilters = {}) =>
    request<Paged<Lead>>("/leads", { query: filters as LeadFilters as Record<string, string | number | undefined> }),
  get: (id: string) => request<Lead>(`/leads/${id}`),
  create: (input: CreateLeadInput) =>
    request<Lead>("/leads", { method: "POST", body: input }),
  update: (id: string, input: Partial<CreateLeadInput> & { status?: LeadStatus; nextFollowupDate?: string | null }) =>
    request<Lead>(`/leads/${id}`, { method: "PATCH", body: input }),
  remove: (id: string) =>
    request<{ message: string }>(`/leads/${id}`, {
      method: "DELETE",
      query: { confirm: "true" },
    }),
  exportCsv: (filters: LeadFilters = {}) =>
    request<string>("/leads/export", {
      query: filters as Record<string, string | number | undefined>,
      raw: true,
    }),
  importCsv: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return request<LeadImportResult>("/leads/import", {
      method: "POST",
      body: formData,
    });
  },
  reassigned: (all?: boolean) =>
    request<Lead[]>("/leads/reassigned", { query: { all: all ? "true" : undefined } }),
};

// ─── Calls ───────────────────────────────────────────────────────────────────

export const callsApi = {
  list: (leadId: string) => request<CallLog[]>(`/leads/${leadId}/calls`),
  create: (
    leadId: string,
    input: { statusAtCall: LeadStatus; summary: string; nextFollowupDate?: string | null },
  ) =>
    request<{ callLog: CallLog; lead: Lead }>(`/leads/${leadId}/calls`, {
      method: "POST",
      body: input,
    }),
};

// ─── Clusters ────────────────────────────────────────────────────────────────

export const clustersApi = {
  list: () => request<ClusterSummary[]>("/clusters"),
  get: (id: string) => request<ClusterDetail>(`/clusters/${id}`),
  mine: () => request<MyCluster[]>("/clusters/mine"),
  todayAssignments: () => request<AssignmentBoardRow[]>("/clusters/assignments/today"),
  assign: (clusterId: string, employeeId: string) =>
    request<unknown>(`/clusters/${clusterId}/assignments`, {
      method: "POST",
      body: { employeeId },
    }),
  unassign: (clusterId: string) =>
    request<{ message: string }>(`/clusters/${clusterId}/assignments/active`, {
      method: "DELETE",
    }),
};

// ─── Website Inquiries ───────────────────────────────────────────────────────

export const inquiriesApi = {
  list: (status?: string, page = 1, limit = 25) =>
    request<Paged<WebsiteInquiry>>("/website-inquiries", {
      query: { status, page, limit },
    }),
  get: (id: string) => request<WebsiteInquiry>(`/website-inquiries/${id}`),
  discard: (id: string) =>
    request<WebsiteInquiry>(`/website-inquiries/${id}/discard`, { method: "POST" }),
  promote: (id: string) =>
    request<
      | { lead: Lead; message: string }
      | { duplicateCandidates: DuplicateCandidate[]; needsResolution: true }
    >(`/website-inquiries/${id}/promote`, { method: "POST" }),
  resolvePromotion: (
    id: string,
    input: { action: "skip" | "import_as_new" | "merge"; existingLeadId?: string },
  ) =>
    request<{ lead?: Lead; message: string }>(
      `/website-inquiries/${id}/promote/resolve`,
      { method: "POST", body: input },
    ),
  submitPublic: (input: {
    businessName: string;
    contactPersonName?: string;
    contact1?: string;
    email1?: string;
    businessType?: string;
    description?: string;
  }) =>
    request<{ message: string }>("/public/website-inquiries", {
      method: "POST",
      body: input,
      auth: false,
    }),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const dashboardApi = {
  summary: () => request<DashboardSummary>("/dashboard/summary"),
  employee: (id: string) => request<EmployeeDashboard>(`/dashboard/employee/${id}`),
};
