import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {createProxyMiddleware} from 'http-proxy-middleware';
import config from '../config';

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    createProxyMiddleware('/api', {
      changeOrigin: true,
      target: config.API_URL
    }),
    compression({threshold: 0}),
    sirv('static', {dev}),
    sapper.middleware()
  )
  .listen(PORT);
