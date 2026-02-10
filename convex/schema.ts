import { defineSchema, defineTable } from "convex/server";
import { zid, zodToConvex } from "convex-helpers/server/zod4";
import type { ZodType } from "zod";
import { array, number, object, string } from "zod";

export const {
  table: experiencesTable,
  insertSchema: experiencesInsertSchema,
  schema: experiencesSchema,
  updateSchema: experiencesUpdateSchema,
} = zodTable("experiences", {
  company: string(),
  title: string(),
  description: string(),
  location: string(),
  technologies: array(string()),
  startDate: number(),
  endDate: number().optional(),
  deletedAt: number().optional(),
});

export const {
  table: projectsTable,
  insertSchema: projectsInsertSchema,
  schema: projectsSchema,
  updateSchema: projectsUpdateSchema,
} = zodTable("projects", {
  name: string(),
  description: string(),
  imageUrl: string().url(),
  links: object({
    website: string().url(),
    github: string().url(),
  }),
  deletedAt: number().optional(),
});

export default defineSchema({
  projects: projectsTable().index("by_deleted_at", ["deletedAt"]),
  experiences: experiencesTable().index("by_deleted_at", ["deletedAt"]),
});

export function zodTable<
  Table extends string,
  T extends { [key: string]: ZodType },
>(tableName: Table, schema: T) {
  const fullSchema = object({
    ...schema,
    _id: zid(tableName),
    _creationTime: number(),
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
