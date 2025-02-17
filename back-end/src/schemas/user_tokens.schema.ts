import { z } from 'zod';

export const UserTokenSchema = z.object({
  id: z.string().uuid(),
  refresh_token: z.string(),
  user_id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type UserToken = z.infer<typeof UserTokenSchema>;
