//= Modules
import { z } from 'zod';
import { TodoSchema } from '../Todo/todo.validation';

export const UserSchema = z.object({
  username: z.string().trim(),
  email: z.string().trim().email({ message: "Email Address is invalid" }),
  password: z.string().min(6, { message: "Password must be 6 or more characters long" }),
  todos: TodoSchema.optional(),
});

export const LoginSchema = UserSchema.pick({ email: true, password: true });

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});