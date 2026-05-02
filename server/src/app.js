const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

function normalizeOrigin(value) {
  return String(value || '')
    .trim()
    .replace(/\/$/, '');
}

/** Comma-separated CLIENT_ORIGIN values; trailing slashes ignored (browser Origin has no path). */
function allowedBrowserOrigins() {
  const raw = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
  return raw
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

function createApp() {
  const app = express();

  const allowed = allowedBrowserOrigins();
  app.use(
    cors({
      origin(originHeader, callback) {
        if (!originHeader) {
          callback(null, true);
          return;
        }
        const reqOrigin = normalizeOrigin(originHeader);
        if (allowed.includes(reqOrigin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.use('/api', routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
