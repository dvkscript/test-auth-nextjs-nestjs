import { z } from 'zod';

export const BlacklistSchema = z.object({
  id: z.string().uuid(),
  token: z.string(),
  expired: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Blacklist = z.infer<typeof BlacklistSchema>;
