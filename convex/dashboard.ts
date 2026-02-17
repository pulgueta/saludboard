import { zQuery } from ".";
import {
  appointmentsAggregate,
  patientsAggregate,
  recordsAggregate,
} from "./aggregate";
import { getProfile } from "./auth";

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const getStats = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return { patients: 0, appointments: 0, records: 0 };
    }

    const ns = { namespace: profile._id };

    const [patients, appointments, records] = await Promise.all([
      patientsAggregate.count(ctx, ns),
      appointmentsAggregate.count(ctx, ns),
      recordsAggregate.count(ctx, ns),
    ]);

    return { patients, appointments, records };
  },
});

export const getRecentActivity = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return { recentPatients: [], recentAppointments: [] };
    }

    const recentPatients = await ctx.db
      .query("patients")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .order("desc")
      .take(5);

    const recentAppointments = await ctx.db
      .query("appointments")
      .withIndex("by_professional_id", (q) =>
        q.eq("professionalId", profile._id),
      )
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .order("desc")
      .take(5);

    return { recentPatients, recentAppointments };
  },
});

export const getUpcomingAppointments = zQuery({
  handler: async (ctx) => {
    const profile = await getProfile(ctx);

    if (!profile) {
      return [];
    }

    const now = Date.now();

    const upcoming = await ctx.db
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
      .take(5);

    const withPatient = await Promise.all(
      upcoming.map(async (appt) => {
        const patient = await ctx.db.get(appt.patientId);

        return { ...appt, patient };
      }),
    );

    return withPatient;
  },
});
