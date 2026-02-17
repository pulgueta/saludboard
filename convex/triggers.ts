import { Triggers } from "convex-helpers/server/triggers";

import type { DataModel } from "./_generated/dataModel";

export const triggers = new Triggers<DataModel>();

triggers.register("users", async (ctx, change) => {
  if (change.operation === "delete" && change.oldDoc) {
    const userId = change.oldDoc._id;

    // Soft-delete all patients owned by this professional
    const patients = await ctx.db
      .query("patients")
      .withIndex("by_professional_id", (q) => q.eq("professionalId", userId))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    const now = Date.now();

    for (const patient of patients) {
      await ctx.db.patch(patient._id, { deletedAt: now });
    }
  }
});
