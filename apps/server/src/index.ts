import { createApp } from './app.js';
import { loadEnv } from './env.js';

const env = loadEnv(process.env);

createApp().listen(env.PORT, (error) => {
  // Express 5 passes listen errors (such as the port being in use) here instead of throwing
  if (error) throw error;
  console.info(`SyncSpace server listening on port ${env.PORT}`);
});
