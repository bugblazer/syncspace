import { z } from 'zod';

import { createPrisma } from '../src/db.js';

export function createTestPrisma() {
  const databaseUrl = z
    .url({ error: 'Tests need DATABASE_URL pointing at a local or CI PostgreSQL' })
    .parse(process.env.DATABASE_URL);
  return createPrisma(databaseUrl);
}
