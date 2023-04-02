//= Modules
import { z } from 'zod';

export const TodoSchema = z.object({
  content: z.string(),
  isCompleted: z.boolean()
});

