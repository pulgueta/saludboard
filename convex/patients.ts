import { authZMutation } from ".";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { User } from "./schema";
import { patients } from "./schema";

export function getByUserId(ctx: QueryCtx | MutationCtx, userId: User["_id"]) {
  return ctx.db
    .query("patients")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .unique();
}

export const create = authZMutation({
  args: patients.insertSchema,
  handler: async (ctx, args) => {
    const patient = await ctx.db.insert("patients", args);

    return patient;
  },
});
