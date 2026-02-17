import { ConvexError } from "convex/values";
import { z } from "zod";

import { zMutation, zQuery } from ".";
import { getProfile } from "./auth";

export const get = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return null;
    }

    return ctx.db
      .query("userSettings")
      .withIndex("by_user_id", (q) => q.eq("userId", profile._id))
      .unique();
  },
});

export const hasCompletedOnboarding = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return false;
    }

    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user_id", (q) => q.eq("userId", profile._id))
      .unique();

    return settings?.onboardingCompleted ?? false;
  },
});

export const getOrCreate = zMutation({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Debes iniciar sesion para continuar.",
      });
    }

    const existing = await ctx.db
      .query("userSettings")
      .withIndex("by_user_id", (q) => q.eq("userId", profile._id))
      .unique();

    if (existing) {
      return existing;
    }

    const id = await ctx.db.insert("userSettings", {
      userId: profile._id,
      onboardingCompleted: false,
    });

    return ctx.db.get(id);
  },
});

export const completeOnboarding = zMutation({
  args: z.object({
    userType: z.enum(["patient", "professional"]),
  }),
  handler: async (ctx, args) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Debes iniciar sesion para continuar.",
      });
    }

    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user_id", (q) => q.eq("userId", profile._id))
      .unique();

    if (settings) {
      await ctx.db.patch(settings._id, { onboardingCompleted: true });
    } else {
      await ctx.db.insert("userSettings", {
        userId: profile._id,
        onboardingCompleted: true,
      });
    }

    await ctx.db.patch(profile._id, { userType: args.userType });
  },
});
