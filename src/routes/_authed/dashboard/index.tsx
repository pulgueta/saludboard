import { createFileRoute } from "@tanstack/react-router";

import { AppErrorBoundary } from "@/components/error-boundary";
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
import {
  dashboardStatsQueryOptions,
  recentActivityQueryOptions,
  upcomingAppointmentsQueryOptions,
} from "@/lib/query-options/dashboard";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: DashboardHomePage,
  pendingComponent: DashboardPageSkeleton,
  errorComponent: AppErrorBoundary,
  loader: async ({ context }) => {
    // if (!context.isAuthenticated) {
    //   throw redirect({ to: "/" });
    // }

    // Prefetch dashboard data in parallel
    await Promise.all([
      context.queryClient.ensureQueryData(dashboardStatsQueryOptions()),
      context.queryClient.ensureQueryData(recentActivityQueryOptions()),
      context.queryClient.ensureQueryData(upcomingAppointmentsQueryOptions()),
    ]);
  },
});

function DashboardHomePage() {
  // TODO: Replace mock data with real query data once Convex types are regenerated
  // const { data: stats } = useSuspenseQuery(dashboardStatsQueryOptions());
  // const { data: activity } = useSuspenseQuery(recentActivityQueryOptions());
  // const { data: upcoming } = useSuspenseQuery(upcomingAppointmentsQueryOptions());

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
