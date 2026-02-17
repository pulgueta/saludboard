import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export function appointmentsQueryOptions() {
  return convexQuery(api.appointments.getAll, {});
}

export function appointmentsByPatientQueryOptions(patientId: Id<"patients">) {
  return convexQuery(api.appointments.getByPatient, { patientId });
}

export function upcomingAppointmentsQueryOptions() {
  return convexQuery(api.appointments.getUpcoming, {});
}
