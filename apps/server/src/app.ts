import express from 'express';

import { handleError, notFound } from './errors.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(notFound);
  app.use(handleError);

  return app;
}
