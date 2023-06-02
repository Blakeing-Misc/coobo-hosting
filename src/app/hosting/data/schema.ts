import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const hostingSchema = z.object({
  // id: z.string(),
  // title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  id: z.string(),
  siteURL: z.string(),
});

export type Task = z.infer<typeof hostingSchema>;
