import { Polar } from "@convex-dev/polar";
import { ConvexError } from "convex/values";
import { zQuery } from ".";
import { components } from "./_generated/api";
import { requireAuth } from "./auth";

export const polar = new Polar(components.polar, {
  getUserInfo: async (ctx) => {
    // biome-ignore lint/suspicious/noExplicitAny: required to run
    const user = await (ctx as any).auth.getUserIdentity();

    return {
      userId: user.subject,
      email: user.email,
    };
  },
});

export const getCurrentSubscription = zQuery({
  handler: async (ctx) => {
    const user = await requireAuth(ctx);

    if (!user?.subject) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Debes iniciar sesion para continuar.",
      });
    }

    const subscription = await polar.getCurrentSubscription(ctx, {
      userId: user.subject,
    });

    const isPaid =
      subscription?.status === "active" &&
      subscription.product.prices.some(
        (price) => price.priceAmount && price.priceAmount > 0,
      );

    return {
      ...subscription,
      isPaid,
    };
  },
});

export const {
  cancelCurrentSubscription,
  changeCurrentSubscription,
  generateCheckoutLink,
  generateCustomerPortalUrl,
  getConfiguredProducts,
  listAllProducts,
  listAllSubscriptions,
} = polar.api();
