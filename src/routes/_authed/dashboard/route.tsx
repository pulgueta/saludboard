import { createFileRoute, Outlet } from "@tanstack/react-router";

import { DashboardShell } from "@/components/compounds/dashboard/dashboard-shell";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardLayout,
  pendingComponent: DashboardPending,
});

function DashboardPending() {
  return (
    <DashboardShell>
      <DashboardPageSkeleton />
    </DashboardShell>
  );
}

function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}
