import { z } from "zod";

// Zod schema for todo validation
export const todoSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Task cannot be empty"),
  completed: z.boolean().default(false),
});

export const createTodoSchema = z.object({
  text: z.string().min(1, "Task cannot be empty"),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Task cannot be empty"),
});

// TypeScript types derived from Zod schemas
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export type FilterType = "all" | "active" | "completed";
