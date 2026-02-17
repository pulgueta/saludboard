import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

export function useCreatePrescription(patientId: Id<"patients">) {
  const create = useMutation(api.prescriptions.create).withOptimisticUpdate(
    (localStore, args) => {
      const currentPrescriptions = localStore.getQuery(
        api.prescriptions.getByPatient,
        { patientId },
      );

      if (currentPrescriptions === undefined) return;

      const optimisticPrescription = {
        _id: crypto.randomUUID() as Id<"prescriptions">,
        _creationTime: Date.now(),
        status: "active" as const,
        prescribedAt: Date.now(),
        ...args,
      } as Doc<"prescriptions">;

      localStore.setQuery(api.prescriptions.getByPatient, { patientId }, [
        ...currentPrescriptions,
        optimisticPrescription,
      ]);
    },
  );

  return { create } as const;
}

export function useUpdatePrescriptionStatus() {
  const updateStatus = useMutation(api.prescriptions.updateStatus);

  return { updateStatus } as const;
}
