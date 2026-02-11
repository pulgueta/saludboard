import { PricingTable } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/pricing")({
  component: PricingPage,
});

function PricingPage() {
  return <PricingTable />;
}
