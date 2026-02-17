import { useSuspenseQuery } from "@tanstack/react-query";

import {
  patientsQueryOptions,
  patientsSearchQueryOptions,
} from "@/lib/query-options/patients";

export { patientsQueryOptions } from "@/lib/query-options/patients";

export function usePatients() {
  return useSuspenseQuery(patientsQueryOptions());
}

export function useSearchPatients(query: string) {
  return useSuspenseQuery(patientsSearchQueryOptions(query));
}
