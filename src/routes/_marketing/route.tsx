import { createFileRoute, Outlet } from "@tanstack/react-router";

import { MarketingFooter } from "@/components/compounds/marketing/marketing-footer";
import { MarketingNavbar } from "@/components/compounds/marketing/marketing-navbar";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
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
