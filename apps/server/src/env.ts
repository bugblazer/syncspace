import { z } from 'zod';

const envSchema = z.object({
  // An IP rather than a hostname: "localhost" can resolve to ::1 or 127.0.0.1 depending on the machine
  HOST: z.union([z.ipv4(), z.ipv6()], {
    error: 'Must be an IPv4 or IPv6 address, such as 127.0.0.1',
  }),
  PORT: z.coerce.number().int().min(1).max(65535),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/, error: 'Must be a postgresql:// URL' }),
});

export function loadEnv(source: NodeJS.ProcessEnv) {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
