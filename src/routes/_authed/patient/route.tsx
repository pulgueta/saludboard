import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PatientShell } from "@/components/compounds/patient/patient-shell";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";

export const Route = createFileRoute("/_authed/patient")({
  component: PatientLayout,
  pendingComponent: PatientPending,
});

function PatientPending() {
  return (
    <PatientShell>
      <DashboardPageSkeleton />
    </PatientShell>
  );
}

function PatientLayout() {
  return (
    <PatientShell>
      <Outlet />
    </PatientShell>
  );
}
