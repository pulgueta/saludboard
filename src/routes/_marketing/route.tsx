import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { MarketingFooter } from "@/components/compounds/marketing/marketing-footer";
import { MarketingNavbar } from "@/components/compounds/marketing/marketing-navbar";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
  loader: async ({ context }) => {
    if (context.userId) {
      const user = await auth();

      if (user.orgId) {
        throw redirect({ to: "/dashboard" });
      } else {
        throw redirect({ to: "/patient" });
      }
    }
  },
  ssr: true,
});

function MarketingLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <MarketingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
