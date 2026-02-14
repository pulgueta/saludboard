import { z } from "zod";

import { zMutation, zQuery } from ".";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { getProfile, requireAuth } from "./auth";
import type { User } from "./schema";
import { patients } from "./schema";

export function getByUserId(ctx: QueryCtx | MutationCtx, userId: User["_id"]) {
  return ctx.db
    .query("patients")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .unique();
}

export const create = zMutation({
  args: patients.insertSchema,
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    if (!user) {
      return;
    }

    const userProfile = await getProfile(ctx);

    if (!userProfile) {
      return;
    }

    const patient = await ctx.db.insert("patients", {
      ...args,
      userId: userProfile._id,
    });

    return patient;
  },
});

export const get = zQuery({
  handler: async (ctx) => {
    const user = await requireAuth(ctx);

    if (!user) {
      return [];
    }

    const patients = await ctx.db.query("patients").collect();

    return patients;
  },
});

export const search = zQuery({
  args: z.object({
    search: z.string(),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    if (!user) {
      return [];
    }

    const searchResults = await ctx.db
      .query("users")
      .withSearchIndex("by_name", (q) => q.search("firstName", args.search))
      .collect();

    const withPatient = await Promise.all(
      searchResults.map(async (user) => {
        const patient = await getByUserId(ctx, user._id);

        return {
          ...user,
          patient,
        };
      }),
    );

    return withPatient;
  },
});
