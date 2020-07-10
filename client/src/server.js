import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {createProxyMiddleware} from 'http-proxy-middleware';
import session from 'express-session';
import {guard} from '@beyonk/sapper-rbac';
import redis from 'redis';
import config from '../config';
import routes from './routes';

const app = express();
const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT
});

app
  .use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
      rolling: true,
      cookie: {maxAge: 31560000},
      store: new RedisStore({client: redisClient})
    })
  )
  .use(
    createProxyMiddleware('/api', {
      changeOrigin: true,
      target: config.API_URL
    }),
    compression({threshold: 0}),
    sirv('static', {dev}),
    (req, res, next) => {
      const {user} = req.session;
      const options = {
        routes,
        deny: () => {
          res.redirect('/login');

          return res.end();
        },
        grant: () => {
          return sapper.middleware({
            session: () => {
              return {
                user
              };
            }
          })(req, res, next);
        }
      };

      return guard(req.path, user, options);
    }
  )
  .listen(PORT);
