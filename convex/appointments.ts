import { ConvexError } from "convex/values";

import { zMutation, zQuery } from ".";
import { appointmentsAggregate } from "./aggregate";
import { getProfile, requireProfessional } from "./auth";
import { appointments, patients } from "./schema";

export const getAll = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("appointments")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();
  },
});

export const getByPatient = zQuery({
  args: patients.tools.id,
  handler: async (ctx, args) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("appointments")
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

export const getUpcoming = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    const now = Date.now();

    return ctx.db
      .query("appointments")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) =>
        q.and(
          q.eq(q.field("deletedAt"), undefined),
          q.eq(q.field("status"), "programada"),
          q.gte(q.field("appointmentDate"), now),
        ),
      )
      .collect();
  },
});

export const create = zMutation({
  args: appointments.insertSchema,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);

    const id = await ctx.db.insert("appointments", {
      ...args,
      professionalId: profile._id,
      status: "programada",
    });

    const doc = await ctx.db.get(id);

    if (doc) {
      await appointmentsAggregate.insert(ctx, doc);
    }

    return id;
  },
});

export const updateStatus = zMutation({
  args: appointments.tools.update,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);
    const existing = await ctx.db.get(args.id);

    if (!existing || existing.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Cita no encontrada.",
      });
    }

    if (existing.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para modificar esta cita.",
      });
    }

    const oldDoc = existing;
    await ctx.db.patch(args.id, { status: args.data.status });
    const newDoc = await ctx.db.get(args.id);

    if (newDoc) {
      await appointmentsAggregate.replace(ctx, oldDoc, newDoc);
    }

    return args.id;
  },
});

export const cancel = zMutation({
  args: appointments.tools.id,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);
    const existing = await ctx.db.get(args.id);

    if (!existing || existing.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Cita no encontrada.",
      });
    }

    if (existing.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para cancelar esta cita.",
      });
    }

    await ctx.db.patch(args.id, { deletedAt: Date.now() });
    await appointmentsAggregate.delete(ctx, existing);
  },
});
