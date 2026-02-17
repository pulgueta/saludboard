import { ConvexError } from "convex/values";

import { zMutation, zQuery } from ".";
import { recordsAggregate } from "./aggregate";
import { getProfile, requireProfessional } from "./auth";
import { patients, records } from "./schema";

export const getByPatient = zQuery({
  args: patients.tools.id,
  handler: async (ctx, args) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("records")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) =>
        q.and(
          q.eq(q.field("deletedAt"), undefined),
          q.eq(q.field("professionalId"), profile._id),
        ),
      )
      .collect();
  },
});

export const getRecent = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("records")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .order("desc")
      .take(20);
  },
});

export const create = zMutation({
  args: records.insertSchema,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);

    const id = await ctx.db.insert("records", {
      ...args,
      professionalId: profile._id,
    });

    const doc = await ctx.db.get(id);

    if (doc) {
      await recordsAggregate.insert(ctx, doc);
    }

    return id;
  },
});

export const update = zMutation({
  args: records.tools.update,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);
    const existing = await ctx.db.get(args.id);

    if (!existing || existing.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Registro no encontrado.",
      });
    }

    if (existing.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para editar este registro.",
      });
    }

    const oldDoc = existing;
    await ctx.db.patch(args.id, args.data);
    const newDoc = await ctx.db.get(args.id);

    if (newDoc) {
      await recordsAggregate.replace(ctx, oldDoc, newDoc);
    }

    return args.id;
  },
});
