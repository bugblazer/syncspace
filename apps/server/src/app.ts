import express from 'express';

import { handleError, notFound } from './errors.js';
import type { PrismaClient } from './generated/prisma/client.js';

interface AppDependencies {
  prisma: PrismaClient;
}

export function createApp({ prisma }: AppDependencies) {
  const app = express();
  app.disable('x-powered-by');

  app.get('/api/health', async (_req, res) => {
    // Caught here so an unreachable database reads as 503 Service Unavailable, not a generic 500
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      console.error(error);
      res.status(503).json({ status: 'unavailable' });
      return;
    }
    res.json({ status: 'ok' });
  });

  app.use(notFound);
  app.use(handleError);

  return app;
}
