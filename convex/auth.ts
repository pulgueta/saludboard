import type { UserJSON } from "@clerk/backend";
import type { Validator } from "convex/values";
import { ConvexError, v } from "convex/values";

import {
  internalMutation,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const user = await ctx.auth.getUserIdentity();

  return user;
}

export async function getProfile(ctx: QueryCtx | MutationCtx) {
  const user = await requireAuth(ctx);

  if (!user?.subject) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "No estás autorizado para realizar esta acción.",
    });
  }

  return await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", user.subject))
    .unique();
}

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  handler: async (ctx, { data }) => {
    const user = await getProfile(ctx);

    if (user === null) {
      await ctx.db.insert("users", {
        clerkUserId: data.id,
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        email: data.email_addresses[0].email_address,
        accountType: "individual",
        userType: "patient",
        imageUrl: data.image_url,
      });
    } else {
      await ctx.db.patch(user._id, {
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        email: data.email_addresses[0].email_address,
      });
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    const user = await getProfile(ctx);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});
