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
  name: z.string(),
  userType: z.enum(["patient", "professional"]),
  accountType: z.enum(["individual", "organization"]),
  organizationId: zid("organizations").optional(),
});

export const {
  table: organizationsTable,
  insertSchema: organizationsInsertSchema,
  schema: organizationsSchema,
  updateSchema: organizationsUpdateSchema,
} = zodTable("organizations", {
  name: z.string(),
  slug: z.string(),
  clerkOrganizationId: z.string(),
  areaOfExpertise: z.array(
    z.enum([
      "general-medicine",
      "pediatrics",
      "dermatology",
      "orthopedics",
      "dentistry",
      "nutrition",
      "psychology",
    ]),
  ),
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
  userId: zid("users"),
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
  users: usersTable().index("by_clerk_user_id", ["clerkUserId"]),
  organizations: organizationsTable().index("by_clerk_organization_id", [
    "clerkOrganizationId",
  ]),
  patients: patientsTable()
    .index("by_user_id", ["userId"])
    .index("by_deleted_at", ["deletedAt"]),
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
