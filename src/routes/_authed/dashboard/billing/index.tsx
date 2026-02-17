import { CustomerPortalLink } from "@convex-dev/polar/react";
import { CreditCardIcon, SparkleIcon } from "@phosphor-icons/react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { api } from "convex/_generated/api";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import { PricingTable } from "@/components/primitives/pricing-table";
import {
  formatPrice,
  getIntervalLabel,
  productsQueryOptions,
  subscriptionQueryOptions,
  usePolarSubscription,
} from "@/hooks/use-polar";

export const Route = createFileRoute("/_authed/dashboard/billing/")({
  component: BillingPage,
  pendingComponent: DashboardPageSkeleton,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(subscriptionQueryOptions()),
      context.queryClient.ensureQueryData(productsQueryOptions()),
    ]);
  },
});

function BillingPage() {
  const { subscription, hasActiveSubscription } = usePolarSubscription();

  const search = useSearch({ from: "/_authed/dashboard/billing/" });
  const canceled = (search as { canceled?: boolean })?.canceled;

  return (
    <>
      <PageHeader
        title="Facturación"
        description="Gestiona tu suscripción y métodos de pago."
      />
      <div className="flex flex-col gap-6">
        {canceled && (
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning">Pago cancelado</CardTitle>
              <CardDescription>
                El proceso de pago fue cancelado. Puedes intentarlo de nuevo
                cuando quieras.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {hasActiveSubscription && subscription ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCardIcon className="size-5" />
                    Plan actual
                  </CardTitle>
                  <CardDescription>Tu suscripción activa</CardDescription>
                </div>
                <Badge
                  variant={
                    subscription.status === "active" ? "success" : "warning"
                  }
                >
                  {subscription.status === "active"
                    ? "Activo"
                    : subscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">
                  {subscription.product?.name}
                </span>
              </div>

              {subscription.amount && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-medium">
                    {formatPrice(
                      subscription.amount,
                      subscription.currency ?? undefined,
                    )}
                    {subscription.recurringInterval &&
                      getIntervalLabel(subscription.recurringInterval)}
                  </span>
                </div>
              )}

              {subscription.currentPeriodEnd && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Próxima facturación
                  </span>
                  <span className="font-medium">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString(
                      "es-CO",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              )}

              {subscription.cancelAtPeriodEnd && (
                <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
                  <p className="text-sm text-warning">
                    Tu suscripción se cancelará al final del período actual.
                  </p>
                </div>
              )}

              <div className="pt-4">
                <CustomerPortalLink
                  polarApi={{
                    generateCustomerPortalUrl:
                      api.polar.generateCustomerPortalUrl,
                  }}
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    Gestionar suscripción
                  </Button>
                </CustomerPortalLink>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <SparkleIcon className="size-6 text-primary" weight="duotone" />
              </div>
              <CardTitle>Sin plan activo</CardTitle>
              <CardDescription>
                Elige un plan para comenzar a usar todas las funcionalidades.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <div>
          <h2 className="mb-4 font-semibold text-lg">Planes disponibles</h2>
          <PricingTable showManageButton />
        </div>
      </div>
    </>
  );
}
