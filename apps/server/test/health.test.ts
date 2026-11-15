import request from 'supertest';
import { describe, it } from 'vitest';

import { createApp } from '../src/app.js';

describe('GET /api/health', () => {
  it('responds 200 with status ok', async () => {
    await request(createApp())
      .get('/api/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ status: 'ok' });
  });

  it('responds 404 for an unknown route', async () => {
    await request(createApp()).get('/api/does-not-exist').expect(404);
  });
});
