import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { hasCompletedOnboardingQueryOptions } from "@/lib/query-options/user-settings";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    if (!context.userId) {
      throw redirect({ to: "/" });
    }

    // Prefetch onboarding status
    await context.queryClient.ensureQueryData(
      hasCompletedOnboardingQueryOptions(),
    );
  },
  component: () => <Outlet />,
});
