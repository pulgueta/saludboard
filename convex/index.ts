import { NoOp } from "convex-helpers/server/customFunctions";
import {
  zCustomAction,
  zCustomMutation,
  zCustomQuery,
} from "convex-helpers/server/zod4";

import { action, internalMutation, mutation, query } from "./_generated/server";

export const zodQuery = zCustomQuery(query, NoOp);
export const zodMutation = zCustomMutation(mutation, NoOp);
export const zodInternalMutation = zCustomMutation(internalMutation, NoOp);
export const zodAction = zCustomAction(action, NoOp);
export const authZodQuery = zCustomQuery(query, {
  args: {},
  input: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return { ctx: { ...ctx, user }, args };
  },
});
export const authZodMutation = zCustomMutation(mutation, {
  args: {},
  input: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return { ctx: { ...ctx, user }, args };
  },
});
