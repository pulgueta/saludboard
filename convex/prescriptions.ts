import { ConvexError } from "convex/values";
import { zid } from "convex-helpers/server/zod4";
import { z } from "zod";

import { zMutation, zQuery } from ".";
import { getProfile, requireProfessional } from "./auth";
import { prescriptions } from "./schema";

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const getByPatient = zQuery({
  args: z.object({
    patientId: zid("patients"),
  }),
  handler: async (ctx, args) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("prescriptions")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.patientId))
      .filter((q) =>
        q.and(
          q.eq(q.field("deletedAt"), undefined),
          q.eq(q.field("professionalId"), profile._id),
        ),
      )
      .collect();
  },
});

export const getActive = zQuery({
  args: z.object({
    patientId: zid("patients"),
  }),
  handler: async (ctx, args) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    return ctx.db
      .query("prescriptions")
      .withIndex("by_patient_id", (q) => q.eq("patientId", args.patientId))
      .filter((q) =>
        q.and(
          q.eq(q.field("deletedAt"), undefined),
          q.eq(q.field("professionalId"), profile._id),
          q.eq(q.field("status"), "active"),
        ),
      )
      .collect();
  },
});

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const create = zMutation({
  args: prescriptions.insertSchema,
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);

    const id = await ctx.db.insert("prescriptions", {
      ...args,
      professionalId: profile._id,
      status: "active",
      prescribedAt: Date.now(),
    });

    return id;
  },
});

export const updateStatus = zMutation({
  args: z.object({
    prescriptionId: zid("prescriptions"),
    status: z.enum(["active", "completed", "cancelled"]),
  }),
  handler: async (ctx, args) => {
    const profile = await requireProfessional(ctx);
    const existing = await ctx.db.get(args.prescriptionId);

    if (!existing || existing.deletedAt) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Prescripcion no encontrada.",
      });
    }

    if (existing.professionalId !== profile._id) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "No tienes permiso para modificar esta prescripcion.",
      });
    }

    await ctx.db.patch(args.prescriptionId, { status: args.status });

    return args.prescriptionId;
  },
});
