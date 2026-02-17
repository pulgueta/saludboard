import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export function prescriptionsByPatientQueryOptions(patientId: Id<"patients">) {
  return convexQuery(api.prescriptions.getByPatient, { patientId });
}

export function activePrescriptionsQueryOptions(patientId: Id<"patients">) {
  return convexQuery(api.prescriptions.getActive, { patientId });
}
