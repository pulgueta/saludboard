import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export function patientsQueryOptions() {
  return convexQuery(api.patients.getAll, {});
}

export function patientByIdQueryOptions(patientId: Id<"patients">) {
  return convexQuery(api.patients.getById, { patientId });
}

export function patientsSearchQueryOptions(query: string) {
  return convexQuery(api.patients.search, { query });
}

export function archivedPatientsQueryOptions() {
  return convexQuery(api.patients.getArchived, {});
}
