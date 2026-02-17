import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export function recordsByPatientQueryOptions(patientId: Id<"patients">) {
  return convexQuery(api.records.getByPatient, { patientId });
}

export function recentRecordsQueryOptions() {
  return convexQuery(api.records.getRecent, {});
}
