import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Boxes,
  CalendarClock,
  ClipboardList,
  ExternalLink,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "./auth/AuthContext";
import { inquiriesApi } from "./lib/api";
import { useAsync } from "./lib/useAsync";
import { Avatar, Button } from "./ui/primitives";
import { SigmoMark } from "../components/SigmoMark";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
  bdOnly?: boolean;
}

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, adminOnly: true },
  { to: "/admin/leads", label: "Leads", icon: ClipboardList },
  { to: "/admin/clusters", label: "Clusters", icon: Boxes, adminOnly: true },
  { to: "/admin/assignments", label: "Assignments", icon: CalendarClock, adminOnly: true },
  { to: "/admin/my-clusters", label: "My Clusters", icon: Boxes, bdOnly: true },
  { to: "/admin/reassigned", label: "Reassigned Leads", icon: CalendarClock },
  { to: "/admin/inquiries", label: "Website Inquiries", icon: Globe, adminOnly: true },
  { to: "/admin/users", label: "Users", icon: Users, adminOnly: true },
];

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-sigmo-green/10 text-sigmo-green ring-1 ring-sigmo-green/25">
        <SigmoMark className="size-6" />
      </span>
      <div className="leading-none">
        <p className="font-rajdhani text-lg font-bold tracking-tight text-sigmo-dark">
          Sigmo<span className="text-sigmo-green">IT</span>
        </p>
        <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
          Admin Console
        </p>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: pendingCount } = useAsync(
    () => (isAdmin ? inquiriesApi.list("pending_review", 1, 1) : Promise.resolve(null)),
    [isAdmin, location.pathname],
  );

  const items = NAV.filter((item) => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.bdOnly && isAdmin) return false;
    return true;
  });

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  const nav = (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {items.map(({ to, label, icon: Icon }) => {
        const badge =
          to === "/admin/inquiries" && isAdmin && pendingCount && pendingCount.pagination.total > 0
            ? pendingCount.pagination.total
            : null;
        return (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sigmo-green/10 text-sigmo-green ring-1 ring-sigmo-green/25"
                  : "text-slate-600 hover:bg-sigmo-green/5 hover:text-sigmo-dark",
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {badge !== null && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-sigmo-green px-1.5 py-0.5 text-[10px] font-bold text-white">
                {badge}
              </span>
            )}
          </NavLink>
        );
      })}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setMobileOpen(false)}
        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-sigmo-green/5 hover:text-sigmo-dark"
      >
        <ExternalLink className="size-4 shrink-0" />
        View website
      </a>
    </nav>
  );

  const footer = (
    <div className="border-t border-slate-200 p-3">
      <div className="mb-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
        <Avatar name={user?.name} className="size-8" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
          <p className="truncate text-[11px] text-slate-500">
            {isAdmin ? "Administrator" : "BD Employee"}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
        <LogOut className="size-4" />
        Sign out
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-sigmo-light">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-4">
          <Brand />
        </div>
        {nav}
        {footer}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-sigmo-dark/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <Brand />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>
            {nav}
            {footer}
          </aside>
        </div>
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"
          >
            <Menu className="size-5" />
          </button>
          <Brand />
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
