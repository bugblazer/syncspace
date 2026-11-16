import 'dotenv/config';

import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Read directly rather than with env(), which refuses to load the config when the variable
  // is missing; prisma generate doesn't need a database, only migrate commands do
  datasource: { url: process.env.DATABASE_URL },
});
