const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const LEGACY_PORT = process.env.LEGACY_PORT;
const KIT_PORT = process.env.KIT_PORT;
const PORT = process.env.PORT;

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(
  createProxyMiddleware({
    changeOrigin: true,
    router: (req) => {
      if (req.path.startsWith('/kit')) {
        return `http://localhost:${KIT_PORT}`;
      }

      if (!isProd && req.path.match(/^\/@fs|node_modules|\.svelte-kit|@vite|src/)) {
        return `http://localhost:${KIT_PORT}`;
      }

      return `http://localhost:${LEGACY_PORT}`;
    },
  })
);

console.log(`client proxy listening on http://localhost:${PORT}`);
app.listen(PORT);
