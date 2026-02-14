import type { OrganizationJSON, UserJSON } from "@clerk/backend";
import { createClerkClient } from "@clerk/backend";
import type { Validator } from "convex/values";
import { v } from "convex/values";
import z from "zod";
import { zQuery } from ".";
import {
  internalMutation,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const user = await ctx.auth.getUserIdentity();

  return user;
}

export async function getProfile(ctx: QueryCtx | MutationCtx) {
  const user = await requireAuth(ctx);

  if (!user?.subject) {
    return null;
  }

  return await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", user.subject))
    .unique();
}

export async function getOrganization(
  ctx: QueryCtx | MutationCtx,
  organizationId: string,
) {
  const user = await requireAuth(ctx);

  if (!user?.subject) {
    return null;
  }

  const organization = await clerkClient.organizations.getOrganization({
    organizationId,
  });

  return ctx.db
    .query("organizations")
    .withIndex("by_clerk_organization_id", (q) =>
      q.eq("clerkOrganizationId", organization.id),
    )
    .unique();
}

export const getCurrentOrganizations = zQuery({
  args: z.object({
    limit: z.number().optional().default(5),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    if (!user?.subject) {
      return null;
    }

    const organization = await clerkClient.organizations.getOrganizationList({
      limit: args.limit,
    });

    return organization;
  },
});

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

export const upsertOrganizationFromClerk = internalMutation({
  args: { data: v.any() as Validator<OrganizationJSON> },
  handler: async (ctx, { data }) => {
    const organization = await getOrganization(ctx, data.id);

    if (organization === null) {
      await ctx.db.insert("organizations", {
        clerkOrganizationId: data.id,
        name: data.name,
        slug: data.slug,
        areaOfExpertise: [],
      });
    } else {
      await ctx.db.patch(organization._id, {
        name: data.name,
        slug: data.slug,
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
