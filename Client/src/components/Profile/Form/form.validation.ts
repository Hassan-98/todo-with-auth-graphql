import { z } from 'zod';

export const userInfoSchema = z.object({
  username: z.string().min(3),
  email: z.string().email()
});

export const userPasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});