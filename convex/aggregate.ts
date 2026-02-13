import { TableAggregate } from "@convex-dev/aggregate";

import { components } from "./_generated/api";
import type { DataModel, Id } from "./_generated/dataModel";

export const aggregateByPatient = new TableAggregate<{
  Namespace: Id<"patients">;
  Key: [string, number];
  DataModel: DataModel;
  TableName: "patients";
}>(components.aggregate, {
  namespace: (doc) => doc._id,
  sortKey: (doc) => [doc.userId, doc._creationTime],
});
