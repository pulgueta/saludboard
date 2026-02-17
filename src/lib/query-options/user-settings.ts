import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";

export function userSettingsQueryOptions() {
  return convexQuery(api.userSettings.get, {});
}

export function hasCompletedOnboardingQueryOptions() {
  return convexQuery(api.userSettings.hasCompletedOnboarding, {});
}
