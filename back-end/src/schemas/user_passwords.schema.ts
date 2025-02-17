import { z } from 'zod';

export const UserPasswordSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  password: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type UserPassword = z.infer<typeof UserPasswordSchema>;
