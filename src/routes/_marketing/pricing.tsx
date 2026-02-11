import { PricingTable } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@ui/switch";
import { useState } from "react";

export const Route = createFileRoute("/_marketing/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const [isOrganizationPlan, setIsOrganizationPlan] = useState(true);

  return (
    <div className="flex min-h-[calc(100dvh-330px)] flex-col items-center justify-start gap-8 p-4 pt-16">
      <header className="text-pretty text-center">
        <h1 className="font-bold text-3xl tracking-tight">Precios</h1>
        <p className="text-muted-foreground text-sm">
          Elige el plan que mejor se adapte a tus necesidades.
        </p>
      </header>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="font-medium text-sm transition-colors data-[active=false]:text-muted-foreground data-[active=true]:text-foreground"
          data-active={!isOrganizationPlan}
          onClick={() => setIsOrganizationPlan(false)}
        >
          Individual
        </button>
        <Switch
          checked={isOrganizationPlan}
          onCheckedChange={setIsOrganizationPlan}
          aria-label="Cambiar tipo de plan"
        />
        <button
          type="button"
          className="font-medium text-sm transition-colors data-[active=false]:text-muted-foreground data-[active=true]:text-foreground"
          data-active={isOrganizationPlan}
          onClick={() => setIsOrganizationPlan(true)}
        >
          Organización
        </button>
      </div>

      <PricingTable for={isOrganizationPlan ? "organization" : "user"} />
    </div>
  );
}
