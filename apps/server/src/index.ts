import { createApp } from './app.js';
import { createPrisma } from './db.js';
import { loadEnv } from './env.js';

const env = loadEnv(process.env);
const prisma = createPrisma(env.DATABASE_URL);

createApp({ prisma }).listen(env.PORT, env.HOST, (error) => {
  // Express 5 passes listen errors (such as the port being in use) here instead of throwing
  if (error) throw error;
  console.info(`SyncSpace server listening on ${env.HOST} port ${env.PORT}`);
});
