import { Field, FieldGroup } from "@ui/field";
import { Skeleton } from "@ui/skeleton";
import type { FC } from "react";

function FieldSkeleton() {
  return (
    <Field>
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-8 w-full" />
    </Field>
  );
}

export const PatientFormSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <FieldGroup className="grid grid-cols-2 gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
      </FieldGroup>

      <div className="flex justify-end gap-3 pt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-36" />
      </div>
    </div>
  );
};
