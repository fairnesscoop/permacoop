import sirv from 'sirv';
import express from 'express';
import session from 'express-session';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import { guard } from '@beyonk/sapper-rbac';
import redis from 'redis';
import routes from './routes';
import config from '../config';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const app = express();
const RedisStore = require('connect-redis')(session);

let redisConfig = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  ttl: config.SESSION_TTL,
};

if (config.REDIS_PASSWORD) {
  redisConfig = {
    ...redisConfig,
    password: config.REDIS_PASSWORD,
  };
}

const redisClient = redis.createClient(redisConfig);

if (!dev) {
  app.set('trust proxy', 1);
}

app
  .use(json())
  .use(
    session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: !dev, maxAge: config.SESSION_TTL },
      store: new RedisStore({ client: redisClient }),
    }),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    (req, res, next) => {
      const { user } = req.session;
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
                user,
              };
            },
          })(req, res, next);
        },
      };

      return guard(req.path, user, options);
    }
  )
  .listen(PORT);
