import { CheckoutLink, CustomerPortalLink } from "@convex-dev/polar/react";
import { CheckIcon } from "@phosphor-icons/react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Empty, EmptyDescription, EmptyTitle } from "@ui/empty";
import { api } from "convex/_generated/api";
import type { FC } from "react";

import type { PolarProduct } from "@/hooks/use-polar";
import {
  formatPrice,
  getIntervalLabel,
  usePolarProducts,
  usePolarSubscription,
} from "@/hooks/use-polar";

type PricingTableProps = {
  showManageButton?: boolean;
  onPlanSelected?: () => void;
};

function ProductCard({
  product,
  isCurrentPlan,
}: {
  product: PolarProduct;
  isCurrentPlan: boolean;
  onPlanSelected?: () => void;
}) {
  const price = product.prices[0];
  const interval = price?.recurringInterval;
  const amount = price?.priceAmount;
  const currency = price?.priceCurrency;

  const isFree = !amount || amount === 0;

  return (
    <Card
      className={`relative flex flex-col ${
        isCurrentPlan ? "border-primary ring-2 ring-primary/20" : ""
      }`}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default">Plan actual</Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        {product.description && (
          <CardDescription className="mt-2">
            {product.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="font-bold text-4xl tracking-tight">
            {formatPrice(amount, currency)}
          </span>
          {interval && (
            <span className="text-muted-foreground text-sm">
              {getIntervalLabel(interval)}
            </span>
          )}
        </div>

        {product.benefits && product.benefits.length > 0 && (
          <ul className="space-y-3">
            {product.benefits.map((benefit) => (
              <li key={benefit.id} className="flex items-start gap-2">
                <CheckIcon
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  weight="bold"
                />
                <span className="text-sm">{benefit.description}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter>
        {isCurrentPlan ? (
          <Button variant="outline" className="w-full" disabled>
            Plan actual
          </Button>
        ) : (
          <CheckoutLink
            polarApi={api.polar}
            productIds={[product.id]}
            embed={false}
            className="w-full"
          >
            <Button className="w-full">
              {isFree ? "Comenzar gratis" : "Suscribirse"}
            </Button>
          </CheckoutLink>
        )}
      </CardFooter>
    </Card>
  );
}

export const PricingTable: FC<PricingTableProps> = ({
  showManageButton = true,
  onPlanSelected,
}) => {
  const { data: products } = usePolarProducts();
  const { subscription, hasActiveSubscription } = usePolarSubscription();

  const currentProductId = subscription?.product?.id;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products ? (
          // @ts-expect-error - products is not typed
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isCurrentPlan={product.id === currentProductId}
              onPlanSelected={onPlanSelected}
            />
          ))
        ) : (
          <Empty>
            <EmptyTitle>No hay productos disponibles</EmptyTitle>
            <EmptyDescription>
              No hay productos disponibles en este momento. Por favor, inténtalo
              de nuevo más tarde.
            </EmptyDescription>
          </Empty>
        )}
      </div>

      {showManageButton && hasActiveSubscription && (
        <div className="flex justify-center">
          <CustomerPortalLink
            polarApi={{
              generateCustomerPortalUrl: api.polar.generateCustomerPortalUrl,
            }}
          >
            <Button variant="outline">Gestionar suscripción</Button>
          </CustomerPortalLink>
        </div>
      )}
    </div>
  );
};
