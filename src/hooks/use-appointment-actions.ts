import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

export function useCreateAppointment() {
  const create = useMutation(api.appointments.create).withOptimisticUpdate(
    (localStore, args) => {
      const currentAppointments = localStore.getQuery(
        api.appointments.getAll,
        {},
      );

      if (currentAppointments === undefined) return;

      const optimisticAppointment = {
        _id: crypto.randomUUID() as Id<"appointments">,
        _creationTime: Date.now(),
        status: "programada" as const,
        ...args,
      } as Doc<"appointments">;

      localStore.setQuery(api.appointments.getAll, {}, [
        ...currentAppointments,
        optimisticAppointment,
      ]);
    },
  );

  return { create } as const;
}

export function useUpdateAppointmentStatus() {
  const updateStatus = useMutation(api.appointments.updateStatus);

  return { updateStatus } as const;
}

export function useCancelAppointment() {
  const cancel = useMutation(api.appointments.cancel).withOptimisticUpdate(
    (localStore, args) => {
      const currentAppointments = localStore.getQuery(
        api.appointments.getAll,
        {},
      );

      if (currentAppointments === undefined) return;

      localStore.setQuery(
        api.appointments.getAll,
        {},
        currentAppointments.filter((a) => a._id !== args.appointmentId),
      );
    },
  );

  return { cancel } as const;
}
