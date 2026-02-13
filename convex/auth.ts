import { ConvexError } from "convex/values";

import type { MutationCtx, QueryCtx } from "./_generated/server";

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const user = await ctx.auth.getUserIdentity();

  if (!user) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "No estás autorizado para realizar esta acción.",
    });
  }

  return user;
}

export async function getProfile(ctx: QueryCtx | MutationCtx) {
  const user = await requireAuth(ctx);

  return await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", user.subject))
    .unique();
}
