import { createFileRoute, Outlet } from "@tanstack/react-router";

import { DashboardShell } from "@/components/compounds/dashboard/dashboard-shell";
import { ContentSkeleton } from "@/components/primitives/gradient-skeleton";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardLayout,
  pendingComponent: DashboardPending,
});

function DashboardPending() {
  return (
    <DashboardShell>
      <div className="p-6">
        <ContentSkeleton lines={6} showAvatar />
      </div>
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
