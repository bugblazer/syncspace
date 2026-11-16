import express, { type RequestHandler } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createApp } from '../src/app.js';
import { handleError } from '../src/errors.js';

function appWithRoute(handler: RequestHandler) {
  const app = express();
  app.get('/boom', handler);
  app.use(handleError);
  return app;
}

describe('unknown routes', () => {
  it('respond 404 with a JSON error', async () => {
    await request(createApp())
      .get('/api/does-not-exist')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({ error: 'Not found' });
  });
});

describe('handleError', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('turns a thrown error into a 500 and logs it', async () => {
    const error = new Error('sync failure');
    const app = appWithRoute(() => {
      throw error;
    });

    await request(app).get('/boom').expect(500).expect({ error: 'Internal server error' });
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  it('turns a rejected promise into a 500 and logs it', async () => {
    const error = new Error('async failure');
    const app = appWithRoute(async () => {
      await Promise.resolve();
      throw error;
    });

    await request(app).get('/boom').expect(500).expect({ error: 'Internal server error' });
    expect(consoleError).toHaveBeenCalledWith(error);
  });
});
