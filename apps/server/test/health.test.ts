import request from 'supertest';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { createApp } from '../src/app.js';
import { createPrisma } from '../src/db.js';
import { createTestPrisma } from './helpers.js';

const prisma = createTestPrisma();
// Port 1 has nothing listening, so every query fails like a database that's down
const unreachablePrisma = createPrisma('postgresql://syncspace@127.0.0.1:1/syncspace');

afterAll(async () => {
  await Promise.all([prisma.$disconnect(), unreachablePrisma.$disconnect()]);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GET /api/health', () => {
  it('responds 200 with status ok when the database answers', async () => {
    await request(createApp({ prisma }))
      .get('/api/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ status: 'ok' });
  });

  it('responds 503 and logs the error when the database is unreachable', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await request(createApp({ prisma: unreachablePrisma }))
      .get('/api/health')
      .expect(503)
      .expect({ status: 'unavailable' });
    expect(consoleError).toHaveBeenCalledOnce();
  });

  it('does not reveal that the server runs Express', async () => {
    const response = await request(createApp({ prisma })).get('/api/health');
    expect(response.get('X-Powered-By')).toBeUndefined();
  });
});
