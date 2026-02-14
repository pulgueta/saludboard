import { zid, zodToConvex } from "convex-helpers/server/zod4";
import { defineSchema, defineTable } from "convex/server";
import type { output, ZodType } from "zod";
import { z } from "zod";

export const users = zodTable("users", {
  clerkUserId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userType: z.enum(["patient", "professional"]),
  email: z.email(),
  phone: z.string().optional(),
  imageUrl: z.string().optional(),
  accountType: z.enum(["individual", "organization"]),
  organizationId: zid("organizations").optional(),
});

export type User = output<typeof users.schema>;

export const organizations = zodTable("organizations", {
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

export type Organization = output<typeof organizations.schema>;

export const patients = zodTable("patients", {
  userId: zid("users"),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  id: z.object({
    type: z.enum(["cc", "ce", "passport", "other"]),
    number: z.string(),
  }),
});

export type Patient = output<typeof patients.schema>;

export const appointments = zodTable("appointments", {
  patientId: zid("patients"),
  appointmentDate: z.number(),
  appointmentTime: z.number(),
  appointmentType: z.enum(["medical", "vaccination", "laboratory", "other"]),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export type Appointment = output<typeof appointments.schema>;

export const records = zodTable("records", {
  patientId: zid("patients"),
  recordType: z.enum(["medical", "vaccination", "laboratory", "other"]),
  recordDate: z.number(),
  recordData: z.object({}),
  key: z.string(),
});

export default defineSchema({
  users: users.table
    .searchIndex("by_name", {
      searchField: "firstName",
      filterFields: ["lastName"],
    })
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_deleted_at", ["deletedAt"]),
  organizations: organizations.table
    .index("by_clerk_organization_id", ["clerkOrganizationId"])
    .index("by_deleted_at", ["deletedAt"]),
  patients: patients.table
    .index("by_user_id", ["userId"])
    .index("by_deleted_at", ["deletedAt"]),
  records: records.table
    .index("by_patient_id", ["patientId"])
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
    deletedAt: z.number().optional(),
  });

  const insertSchema = fullSchema.partial({
    deletedAt: true,
    _id: true,
    _creationTime: true,
  });

  const updateSchema = fullSchema
    .omit({ deletedAt: true, _id: true, _creationTime: true })
    .partial();

  return {
    tableName,
    schema: fullSchema,
    insertSchema,
    updateSchema,
    table: defineTable(zodToConvex(fullSchema)),
  };
}
