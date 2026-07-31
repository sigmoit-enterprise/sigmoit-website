import type { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ToastProvider } from "./ui/Toast";
import { AdminLayout } from "./AdminLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LeadsPage } from "./pages/LeadsPage";
import { ClustersPage } from "./pages/ClustersPage";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import { MyClustersPage } from "./pages/MyClustersPage";
import { ReassignedLeadsPage } from "./pages/ReassignedLeadsPage";
import { InquiriesPage } from "./pages/InquiriesPage";
import { UsersPage } from "./pages/UsersPage";

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin/leads" replace />;
  return <>{children}</>;
}

/** BD users have no dashboard, so send them somewhere useful. */
function HomeRoute() {
  const { isAdmin } = useAuth();
  return isAdmin ? <DashboardPage /> : <Navigate to="/admin/my-clusters" replace />;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<HomeRoute />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="reassigned" element={<ReassignedLeadsPage />} />
            <Route path="my-clusters" element={<MyClustersPage />} />
            <Route
              path="clusters"
              element={
                <RequireAdmin>
                  <ClustersPage />
                </RequireAdmin>
              }
            />
            <Route
              path="assignments"
              element={
                <RequireAdmin>
                  <AssignmentsPage />
                </RequireAdmin>
              }
            />
            <Route
              path="inquiries"
              element={
                <RequireAdmin>
                  <InquiriesPage />
                </RequireAdmin>
              }
            />
            <Route
              path="users"
              element={
                <RequireAdmin>
                  <UsersPage />
                </RequireAdmin>
              }
            />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
