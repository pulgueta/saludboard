import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export function patientsQueryOptions() {
  return convexQuery(api.patients.get);
}

export function usePatients() {
  return useSuspenseQuery(patientsQueryOptions());
}

export function patientsSearchQueryOptions(search: string) {
  return convexQuery(api.patients.search, {
    search,
  });
}

export function useSearchPatients(search: string) {
  return useSuspenseQuery(patientsSearchQueryOptions(search));
}

export function usePatientActions() {
  const createPatient = useMutation({
    mutationFn: useConvexMutation(api.patients.create),
  });

  return {
    createPatient,
  } as const;
}
