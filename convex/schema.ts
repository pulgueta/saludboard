import { zid, zodToConvex } from "convex-helpers/server/zod4";
import { defineSchema, defineTable } from "convex/server";
import type { output, ZodType } from "zod";
import { z } from "zod";

import { DOCUMENT_TYPES } from "../src/lib/colombian-health-data";

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

export const patients = zodTable("patients", {
  professionalId: zid("users"),
  userId: zid("users").optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  documentType: z.enum(DOCUMENT_TYPES.map((type) => type.value)),
  documentNumber: z.string(),
  birthDate: z.number(),
  gender: z.enum(["male", "female", "other"]),
  regime: z.enum(["contributive", "subsidiary", "linked"]),
  email: z.email().optional(),
  phone: z.string().optional(),
  eps: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  emergencyContact: z
    .object({
      name: z.string(),
      phone: z.string(),
      relationship: z.string(),
    })
    .optional(),
});

export const appointments = zodTable("appointments", {
  patientId: zid("patients"),
  professionalId: zid("users"),
  appointmentDate: z.number(),
  appointmentTime: z.number(),
  appointmentType: z.enum([
    "consulta",
    "control",
    "urgencia",
    "procedimiento",
    "valoracion",
  ]),
  status: z.enum(["programada", "completada", "cancelada", "no-asistio"]),
  notes: z.string().optional(),
  duration: z.number().default(30),
});

export const records = zodTable("records", {
  patientId: zid("patients"),
  professionalId: zid("users"),
  recordType: z.enum(["consulta", "laboratorio", "imagen", "receta", "otro"]),
  recordDate: z.number(),
  summary: z.string().optional(),
  recordData: z.string().optional(),
  key: z.string().optional(),
});

export const prescriptions = zodTable("prescriptions", {
  patientId: zid("patients"),
  professionalId: zid("users"),
  medication: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  duration: z.string(),
  instructions: z.string().optional(),
  status: z.enum(["active", "completed", "cancelled"]),
  prescribedAt: z.number(),
});

export const userSettings = zodTable("userSettings", {
  userId: zid("users"),
  onboardingCompleted: z.boolean().default(false),
});

export type User = output<typeof users.schema>;
export type Organization = output<typeof organizations.schema>;
export type Patient = output<typeof patients.schema>;
export type Appointment = output<typeof appointments.schema>;
export type Record = output<typeof records.schema>;
export type Prescription = output<typeof prescriptions.schema>;
export type UserSettings = output<typeof userSettings.schema>;

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
    .index("by_professional_id", ["professionalId"])
    .index("by_user_id", ["userId"])
    .index("by_document", ["documentType", "documentNumber"])
    .index("by_deleted_at", ["deletedAt"]),

  appointments: appointments.table
    .index("by_patient_id", ["patientId"])
    .index("by_professional_id", ["professionalId"])
    .index("by_date", ["appointmentDate"])
    .index("by_status", ["status"])
    .index("by_deleted_at", ["deletedAt"]),

  records: records.table
    .index("by_patient_id", ["patientId"])
    .index("by_professional_id", ["professionalId"])
    .index("by_deleted_at", ["deletedAt"]),

  prescriptions: prescriptions.table
    .index("by_patient_id", ["patientId"])
    .index("by_professional_id", ["professionalId"])
    .index("by_status", ["status"])
    .index("by_deleted_at", ["deletedAt"]),

  userSettings: userSettings.table.index("by_user_id", ["userId"]),
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

  const insertSchema = fullSchema.omit({
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
