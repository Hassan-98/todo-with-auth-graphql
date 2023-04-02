import { z } from 'zod';

export const TodoSchema = z.object({
  content: z.string().min(3),
  isCompleted: z.boolean().optional(),
  author: z.string().min(24)
})

export const UpdateTodoSchema = z.object({
  _id: z.string().min(24),
  content: z.string().min(3)
})