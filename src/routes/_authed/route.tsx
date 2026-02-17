import { createFileRoute, Outlet } from "@tanstack/react-router";

import { hasCompletedOnboardingQueryOptions } from "@/lib/query-options/user-settings";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    // if (!context.isAuthenticated) {
    //   throw redirect({ to: "/" });
    // }

    // Prefetch onboarding status
    await context.queryClient.ensureQueryData(
      hasCompletedOnboardingQueryOptions(),
    );
  },
  component: () => <Outlet />,
});
