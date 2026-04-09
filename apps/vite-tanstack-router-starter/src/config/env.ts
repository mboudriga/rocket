import { z } from 'zod';

const envSchema = z.object({
  // Add environment variables here
  // VITE_API_URL: z.string().url(),
});

// Uncomment when env vars are defined
// export const env = envSchema.parse(import.meta.env);

export const env = {} as z.infer<typeof envSchema>;
