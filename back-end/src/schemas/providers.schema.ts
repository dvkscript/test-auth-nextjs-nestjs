import { z } from 'zod';

export const ProviderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  user_id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Provider = z.infer<typeof ProviderSchema>;
