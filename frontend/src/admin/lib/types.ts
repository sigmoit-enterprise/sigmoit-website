export type Role = "admin" | "bd_employee";

export type LeadStatus =
  | "new"
  | "contacted"
  | "follow_up_scheduled"
  | "no_response"
  | "not_interested"
  | "converted";

export type LeadSource = "manual" | "website" | "csv_import";
export type Country = "Nepal" | "International";
export type InquiryStatus = "pending_review" | "promoted" | "discarded";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "follow_up_scheduled",
  "no_response",
  "not_interested",
  "converted",
];

export const LEAD_SOURCES: LeadSource[] = ["manual", "website", "csv_import"];

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Ref {
  id: string;
  name: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  provinceId: number;
}

export interface CallLog {
  id: string;
  leadId: string;
  calledById: string;
  calledBy?: Ref;
  statusAtCall: LeadStatus;
  summary: string;
  nextFollowupDate: string | null;
  createdAt: string;
  lead?: { id: string; businessName: string };
}

export interface Lead {
  id: string;
  businessName: string;
  businessType: string;
  contactPersonName: string | null;
  contact1: string | null;
  contact2: string | null;
  contact3: string | null;
  email1: string | null;
  email2: string | null;
  country: Country;
  provinceId: number | null;
  province: Province | null;
  districtId: number | null;
  district: District | null;
  cityMunicipality: string | null;
  locationFreeText: string | null;
  landmarkArea: string | null;
  description: string | null;
  leadById: string | null;
  leadBy: Ref | null;
  source: LeadSource;
  clusterId: string | null;
  cluster: { id: string; name: string } | null;
  status: LeadStatus;
  nextFollowupDate: string | null;
  createdAt: string;
  updatedAt: string;
  callLogs?: CallLog[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paged<T> {
  data: T[];
  pagination: Pagination;
}

export interface ClusterSummary {
  id: string;
  name: string;
  leadCount: number;
  capacityRemaining: number;
  currentAssignee: User | null;
  createdAt: string;
}

export interface AssignmentHistoryEntry {
  id: string;
  assignedDate: string;
  removedAt: string | null;
  createdAt: string;
  employee: Ref;
  assignedBy: Ref;
}

export interface ClusterDetail {
  id: string;
  name: string;
  leadCount: number;
  statusBreakdown: Partial<Record<LeadStatus, number>>;
  calledToday: number;
  upcomingFollowups: number;
  currentAssignee: User | null;
  assignmentHistory?: AssignmentHistoryEntry[];
  createdAt: string;
}

export interface MyCluster {
  assignmentId: string;
  clusterId: string;
  clusterName: string;
  leadCount: number;
}

export interface AssignmentBoardRow {
  clusterId: string;
  clusterName: string;
  leadCount: number;
  currentAssignee: User | null;
}

export interface WebsiteInquiry {
  id: string;
  businessName: string;
  contactPersonName: string | null;
  contact1: string | null;
  email1: string | null;
  businessType: string | null;
  description: string | null;
  submittedAt: string;
  status: InquiryStatus;
  promotedLeadId: string | null;
  promotedLead: { id: string; businessName: string } | null;
  reviewedBy: Ref | null;
  reviewedAt: string | null;
}

export interface DuplicateCandidate {
  leadId: string;
  businessName: string;
  matchReason: string;
}

export interface EmployeeMetrics {
  employeeId: string;
  employeeName: string;
  dueToday: number;
  activeWorkload: number;
  callsCompletedToday: number;
  completionRate: number;
}

export interface DashboardSummary {
  system: {
    dueToday: number;
    callsCompletedToday: number;
    completionRate: number;
    pendingWebsiteInquiries: number;
  };
  employees: EmployeeMetrics[];
  statusFunnel: { status: LeadStatus; count: number }[];
  clusters: {
    clusterId: string;
    clusterName: string;
    leadCount: number;
    currentAssignee: User | null;
    leadsCalledToday: number;
  }[];
}

export interface EmployeeDashboard {
  clusters: { clusterId: string; clusterName: string; leadCount: number }[];
  dueToday: number;
  activeWorkload: number;
  callsCompletedToday: number;
  completionRate: number;
  recentCalls: CallLog[];
}
