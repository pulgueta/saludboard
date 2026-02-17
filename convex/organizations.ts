import { z } from "zod";

import { zQuery } from ".";
import { getProfile } from "./auth";

export const getForCurrentUser = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    if (!profile.organizationId) {
      return [];
    }

    const org = await ctx.db.get(profile.organizationId);

    if (!org || org.deletedAt) {
      return [];
    }

    return [org];
  },
});

export const getByClerkId = zQuery({
  args: z.object({
    clerkOrganizationId: z.string(),
  }),
  handler: async (ctx, args) => {
    return ctx.db
      .query("organizations")
      .withIndex("by_clerk_organization_id", (q) =>
        q.eq("clerkOrganizationId", args.clerkOrganizationId),
      )
      .unique();
  },
});
