import { Triggers } from "convex-helpers/server/triggers";

import type { DataModel } from "./_generated/dataModel";
import { getProfile } from "./auth";
import { getByUserId } from "./patients";

export const triggers = new Triggers<DataModel>();

triggers.register("users", async (ctx, change) => {
  if (change.operation === "delete") {
    const user = await getProfile(ctx);

    if (!user) {
      return;
    }

    const patient = await getByUserId(ctx, user._id);

    if (patient) {
      await ctx.db.delete("patients", patient._id);
    }
  }
});
