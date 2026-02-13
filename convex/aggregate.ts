import { TableAggregate } from "@convex-dev/aggregate";

import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import type { Patient } from "./schema";

export const aggregateByPatient = new TableAggregate<{
  Namespace: Patient["_id"];
  Key: [string, number];
  DataModel: DataModel;
  TableName: "patients";
}>(components.aggregate, {
  namespace: (doc) => doc._id,
  sortKey: (doc) => [doc.userId, doc._creationTime],
});
