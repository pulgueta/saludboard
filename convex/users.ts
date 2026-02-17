import { z } from "zod";

import { zQuery } from ".";
import { getProfile } from "./auth";

export const exists = zQuery({
  args: z.object({
    clerkUserId: z.string(),
  }),
  returns: z.boolean(),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", args.clerkUserId),
      )
      .unique();

    return !!user;
  },
});

export const get = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return null;
    }

    return profile;
  },
});
