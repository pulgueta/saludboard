import { TableAggregate } from "@convex-dev/aggregate";

import { components } from "./_generated/api";
import type { DataModel, Id } from "./_generated/dataModel";

export const patientsAggregate = new TableAggregate<{
  Namespace: Id<"users">;
  Key: number;
  DataModel: DataModel;
  TableName: "patients";
}>(components.patientsAggregate, {
  namespace: (doc) => doc.professionalId,
  sortKey: (doc) => doc._creationTime,
});

export const appointmentsAggregate = new TableAggregate<{
  Namespace: Id<"users">;
  Key: number;
  DataModel: DataModel;
  TableName: "appointments";
}>(components.appointmentsAggregate, {
  namespace: (doc) => doc.professionalId,
  sortKey: (doc) => doc.appointmentDate,
});

export const recordsAggregate = new TableAggregate<{
  Namespace: Id<"users">;
  Key: number;
  DataModel: DataModel;
  TableName: "records";
}>(components.recordsAggregate, {
  namespace: (doc) => doc.professionalId,
  sortKey: (doc) => doc.recordDate,
});
