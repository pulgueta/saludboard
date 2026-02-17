import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

export function usePatientsActions() {
  const create = useMutation(api.patients.create).withOptimisticUpdate(
    (localStore, args) => {
      const currentPatients = localStore.getQuery(api.patients.getAll, {});

      if (currentPatients === undefined) return;

      const optimisticPatient = {
        _id: crypto.randomUUID() as Id<"patients">,
        _creationTime: Date.now(),
        ...args,
      } as Doc<"patients">;

      localStore.setQuery(api.patients.getAll, {}, [
        ...currentPatients,
        optimisticPatient,
      ]);
    },
  );

  const update = useMutation(api.patients.update).withOptimisticUpdate(
    (localStore, args) => {
      const currentPatients = localStore.getQuery(api.patients.getAll, {});

      if (currentPatients === undefined) return;

      const optimisticPatient = {
        ...currentPatients.find((p) => p._id === args.patientId),
        ...args.data,
      } as Doc<"patients">;

      localStore.setQuery(api.patients.getAll, {}, [
        ...currentPatients,
        optimisticPatient,
      ]);
    },
  );

  const archive = useMutation(api.patients.archive).withOptimisticUpdate(
    (localStore, args) => {
      const currentPatients = localStore.getQuery(api.patients.getAll, {});

      if (currentPatients === undefined) return;

      localStore.setQuery(
        api.patients.getAll,
        {},
        currentPatients.filter((p) => p._id !== args.patientId),
      );
    },
  );

  const restore = useMutation(api.patients.restore);

  return { create, update, archive, restore } as const;
}
