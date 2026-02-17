import { NoOp } from "convex-helpers/server/customFunctions";
import {
  zCustomAction,
  zCustomMutation,
  zCustomQuery,
} from "convex-helpers/server/zod4";

import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

export const zQuery = zCustomQuery(query, NoOp);
export const zInternalQuery = zCustomQuery(internalQuery, NoOp);
export const zMutation = zCustomMutation(mutation, NoOp);
export const zInternalMutation = zCustomMutation(internalMutation, NoOp);
export const zAction = zCustomAction(action, NoOp);
export const zInternalAction = zCustomAction(internalAction, NoOp);
