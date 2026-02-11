import { createFileRoute } from "@tanstack/react-router";

import { AppointmentChart } from "@/components/features/dashboard/appointment-chart";
import { RecentActivity } from "@/components/features/dashboard/recent-activity";
import { StatCards } from "@/components/features/dashboard/stat-cards";
import { UpcomingAppointments } from "@/components/features/dashboard/upcoming-appointments";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import {
  MOCK_RECENT_PATIENTS,
  MOCK_STATS,
  MOCK_UPCOMING_APPOINTMENTS,
} from "@/lib/dashboard-mock-data";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: DashboardHomePage,
  pendingComponent: DashboardPageSkeleton,
});

function DashboardHomePage() {
  return (
    <>
      <PageHeader title="Inicio" description="Resumen general de tu práctica" />
      <StatCards stats={MOCK_STATS} />
      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <AppointmentChart />
        <div className="flex flex-col gap-4">
          <UpcomingAppointments appointments={MOCK_UPCOMING_APPOINTMENTS} />
          <RecentActivity patients={MOCK_RECENT_PATIENTS} />
        </div>
      </div>
    </>
  );
}
