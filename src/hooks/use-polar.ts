import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export function productsQueryOptions() {
  return convexQuery(api.polar.getConfiguredProducts);
}

export function subscriptionQueryOptions() {
  return convexQuery(api.polar.getCurrentSubscription);
}

export type PolarPrice = {
  id: string;
  priceAmount?: number;
  priceCurrency?: string;
  recurringInterval?: string | null;
  isArchived: boolean;
};

export type PolarProduct = {
  id: string;
  name: string;
  description: string | null;
  isRecurring: boolean;
  isArchived: boolean;
  prices: PolarPrice[];
  benefits?: Array<{
    id: string;
    description: string;
    type: string;
  }>;
  recurringInterval?: string | null;
  metadata?: Record<string, unknown>;
};

export type PolarSubscription = {
  id: string;
  status: string;
  amount: number | null;
  currency: string | null;
  currentPeriodStart: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  product: PolarProduct;
  isPaid: boolean;
  recurringInterval?: string | null;
};

const SLUG_TO_PRODUCT_MAPPING: Record<string, "individual" | "organization"> = {
  individual: "individual",
  professional: "individual",
  starter: "individual",
  basic: "individual",
  organization: "organization",
  team: "organization",
  enterprise: "organization",
  clinic: "organization",
};

export function getProductType(
  product: PolarProduct | null | undefined,
): "individual" | "organization" | null {
  if (!product) return null;

  if (product.metadata?.type === "individual") return "individual";
  if (product.metadata?.type === "organization") return "organization";

  const nameLower = product.name.toLowerCase();
  for (const [keyword, type] of Object.entries(SLUG_TO_PRODUCT_MAPPING)) {
    if (nameLower.includes(keyword)) return type;
  }

  return null;
}

export function formatPrice(
  amount: number | undefined,
  currency: string | undefined,
): string {
  if (!amount) return "Gratis";

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount / 100);
}

export function getIntervalLabel(interval: string | null | undefined): string {
  switch (interval) {
    case "month":
      return "/mes";
    case "year":
      return "/año";
    default:
      return "";
  }
}

export function usePolarProducts() {
  return useSuspenseQuery(productsQueryOptions());
}

export function usePolarSubscription() {
  const { data: subscription, isLoading } = useSuspenseQuery(
    subscriptionQueryOptions(),
  );

  return {
    subscription,
    isLoading,
    hasActiveSubscription:
      subscription?.status === "active" || subscription?.status === "trialing",
    isPaid: subscription?.isPaid ?? false,
  };
}
