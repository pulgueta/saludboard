import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";

export function dashboardStatsQueryOptions() {
  return convexQuery(api.dashboard.getStats, {});
}

export function recentActivityQueryOptions() {
  return convexQuery(api.dashboard.getRecentActivity, {});
}

export function upcomingAppointmentsQueryOptions() {
  return convexQuery(api.dashboard.getUpcomingAppointments, {});
}
