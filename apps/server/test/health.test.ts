import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';

describe('GET /api/health', () => {
  it('responds 200 with status ok', async () => {
    await request(createApp())
      .get('/api/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ status: 'ok' });
  });

  it('does not reveal that the server runs Express', async () => {
    const response = await request(createApp()).get('/api/health');
    expect(response.get('X-Powered-By')).toBeUndefined();
  });
});
