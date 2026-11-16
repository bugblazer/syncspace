import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Not found' });
};

export const handleError: ErrorRequestHandler = (error, _req, res, next) => {
  // Once a response has started it can't become a 500; Express's default handler closes the connection
  if (res.headersSent) {
    next(error);
    return;
  }
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};
