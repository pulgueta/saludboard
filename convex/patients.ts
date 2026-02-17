import { ConvexError } from "convex/values";
import { zid } from "convex-helpers/server/zod4";
import { z } from "zod";

import { zMutation, zQuery } from ".";
import { patientsAggregate } from "./aggregate";
import { getProfile, requireAuth, requireProfessional } from "./auth";
import { rateLimitOrThrow } from "./ratelimit";
import { patients } from "./schema";

export const getAll = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("patients")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();
  },
});

export const getById = zQuery({
  args: z.object({
    patientId: zid("patients"),
  }),
  handler: async (ctx, args) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return null;
    }

    const patient = await ctx.db.get(args.patientId);

    if (!patient || patient.deletedAt) {
      return null;
    }

    if (patient.professionalId !== profile._id) {
      return null;
    }

    return patient;
  },
});

export const search = zQuery({
  args: z.object({
    query: z.string(),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuth(ctx);

    if (!user) {
      return [];
    }

    const searchResults = await ctx.db
      .query("users")
      .withSearchIndex("by_name", (q) => q.search("firstName", args.query))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    const patientWithUserProfile = await Promise.all(
      searchResults.map(async (user) => {
        const patient = await ctx.db
          .query("patients")
          .withIndex("by_user_id", (q) => q.eq("userId", user._id))
          .unique();

        return {
          ...patient,
          user,
        };
      }),
    );

    return patientWithUserProfile;
  },
});

export const getArchived = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("patients")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) => q.neq(q.field("deletedAt"), undefined))
      .collect();
  },
});

export const create = zMutation({
  args: patients.insertSchema,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);

    await rateLimitOrThrow(ctx, "createPatient", profile._id);

    const id = await ctx.db.insert("patients", {
      ...args,
      professionalId: profile._id,
    });

    const doc = await ctx.db.get(id);

    if (doc) {
      await patientsAggregate.insert(ctx, doc);
    }

    return id;
  },
});

export const update = zMutation({
  args: patients.tools.update,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);

    const existing = await ctx.db.get(args.id);

    if (!existing || existing.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Paciente no encontrado.",
      });
    }

    if (existing.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para editar este paciente.",
      });
    }

    const oldDoc = existing;

    await ctx.db.patch(args.id, args.data);
    const newDoc = await ctx.db.get(args.id);

    if (newDoc) {
      await patientsAggregate.replace(ctx, oldDoc, newDoc);
    }

    return args.id;
  },
});

export const archive = zMutation({
  args: patients.tools.id,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);
    const patient = await ctx.db.get(args.id);

    if (!patient || patient.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Paciente no encontrado.",
      });
    }

    if (patient.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para archivar este paciente.",
      });
    }

    const now = Date.now();

    // Soft delete patient
    await ctx.db.patch(args.id, { deletedAt: now });
    await patientsAggregate.delete(ctx, patient);

    // Cascade: soft delete appointments
    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    for (const appt of appointments) {
      await ctx.db.patch(appt._id, { deletedAt: now });
    }

    // Cascade: soft delete records
    const records = await ctx.db
      .query("records")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    for (const rec of records) {
      await ctx.db.patch(rec._id, { deletedAt: now });
    }

    // Cascade: soft delete prescriptions
    const prescriptions = await ctx.db
      .query("prescriptions")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    for (const rx of prescriptions) {
      await ctx.db.patch(rx._id, { deletedAt: now });
    }
  },
});

export const restore = zMutation({
  args: patients.tools.id,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);
    const patient = await ctx.db.get(args.id);

    if (!patient || !patient.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Paciente archivado no encontrado.",
      });
    }

    if (patient.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para restaurar este paciente.",
      });
    }

    const archivedAt = patient.deletedAt;

    // Restore patient
    await ctx.db.patch(args.id, { deletedAt: undefined });
    const restoredDoc = await ctx.db.get(args.id);

    if (restoredDoc) {
      await patientsAggregate.insert(ctx, restoredDoc);
    }

    // Restore cascaded appointments
    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) => q.eq(q.field("deletedAt"), archivedAt))
      .collect();

    for (const appt of appointments) {
      await ctx.db.patch(appt._id, { deletedAt: undefined });
    }

    // Restore cascaded records
    const records = await ctx.db
      .query("records")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) => q.eq(q.field("deletedAt"), archivedAt))
      .collect();

    for (const rec of records) {
      await ctx.db.patch(rec._id, { deletedAt: undefined });
    }

    // Restore cascaded prescriptions
    const prescriptions = await ctx.db
      .query("prescriptions")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.id))
      .filter((q) => q.eq(q.field("deletedAt"), archivedAt))
      .collect();

    for (const rx of prescriptions) {
      await ctx.db.patch(rx._id, { deletedAt: undefined });
    }
  },
});
