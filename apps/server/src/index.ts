import { createApp } from './app.js';

const port = Number(process.env.PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be set to a port number between 1 and 65535');
}

createApp().listen(port, (error) => {
  // Express 5 passes listen errors (such as the port being in use) here instead of throwing
  if (error) throw error;
  console.info(`SyncSpace server listening on port ${port}`);
});
