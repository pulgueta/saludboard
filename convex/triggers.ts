import { Triggers } from "convex-helpers/server/triggers";

import type { DataModel } from "./_generated/dataModel";

export const triggers = new Triggers<DataModel>();

triggers.register("users", async (ctx, change) => {
  if (change.operation === "delete" && change.oldDoc) {
    const userId = change.oldDoc._id;
    const clerkOrganizationId = change.oldDoc.organizationId;

    if (clerkOrganizationId) {
      const organization = await ctx.db
        .query("organizations")
        .withIndex("by_clerk_organization_id", (q) =>
          q.eq("clerkOrganizationId", clerkOrganizationId),
        )
        .unique();

      if (organization) {
        await ctx.db.delete(organization._id);
      }
    }

    const patients = await ctx.db
      .query("patients")
      .withIndex("by_professional_id", (q) => q.eq("professionalId", userId))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_professional_id", (q) => q.eq("professionalId", userId))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    const records = await ctx.db
      .query("records")
      .withIndex("by_professional_id", (q) => q.eq("professionalId", userId))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    const prescriptions = await ctx.db
      .query("prescriptions")
      .withIndex("by_professional_id", (q) => q.eq("professionalId", userId))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    for (const patient of patients) {
      await ctx.db.delete(patient._id);
    }

    for (const appointment of appointments) {
      await ctx.db.delete(appointment._id);
    }

    for (const record of records) {
      await ctx.db.delete(record._id);
    }

    for (const prescription of prescriptions) {
      await ctx.db.delete(prescription._id);
    }
  }
});
