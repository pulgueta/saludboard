import { zMutation } from ".";
import { requireAuth } from "./auth";
import { records } from "./schema";

export const create = zMutation({
  args: records.insertSchema,
  handler: async (ctx, args) => {
    const _user = await requireAuth(ctx);

    const _record = await ctx.db.insert("records", args);
  },
});
