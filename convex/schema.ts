import { defineSchema, defineTable } from "convex/server";
import { zid, zodToConvex } from "convex-helpers/server/zod4";
import type { ZodType } from "zod";
import { z } from "zod";

export const {
  table: usersTable,
  insertSchema: usersInsertSchema,
  schema: usersSchema,
  updateSchema: usersUpdateSchema,
} = zodTable("users", {
  clerkUserId: z.string(),
});

export const {
  table: appointmentsTable,
  insertSchema: appointmentsInsertSchema,
  schema: appointmentsSchema,
  updateSchema: appointmentsUpdateSchema,
} = zodTable("appointments", {
  patientId: zid("patients"),
  appointmentDate: z.number(),
  appointmentTime: z.number(),
  appointmentType: z.enum(["medical", "vaccination", "laboratory", "other"]),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export const {
  table: patientsTable,
  insertSchema: patientsInsertSchema,
  schema: patientsSchema,
  updateSchema: patientsUpdateSchema,
} = zodTable("patients", {
  firstName: z.string(),
  lastName: z.string(),
  email: z.email().optional(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  id: z.object({
    type: z.enum(["cc", "ce", "passport", "other"]),
    number: z.string(),
  }),
  deletedAt: z.number().optional(),
});

export const {
  table: recordsTable,
  insertSchema: recordsInsertSchema,
  schema: recordsSchema,
  updateSchema: recordsUpdateSchema,
} = zodTable("records", {
  patientId: zid("patients"),
  recordType: z.enum(["medical", "vaccination", "laboratory", "other"]),
  recordDate: z.number(),
  recordData: z.object({}),
  deletedAt: z.number().optional(),
});

export default defineSchema({
  patients: patientsTable().index("by_deleted_at", ["deletedAt"]),
});

export function zodTable<
  Table extends string,
  T extends { [key: string]: ZodType },
>(tableName: Table, schema: T) {
  const fullSchema = z.object({
    ...schema,
    _id: zid(tableName),
    _creationTime: z.number(),
  });

  const insertSchema = fullSchema.partial({
    _id: true,
    _creationTime: true,
  });

  const updateSchema = fullSchema
    .omit({ _id: true, _creationTime: true })
    .partial();

  return {
    tableName,
    schema: fullSchema,
    insertSchema,
    updateSchema,
    table: () => {
      return defineTable(zodToConvex(fullSchema));
    },
  };
}
