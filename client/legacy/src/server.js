import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import * as sapper from '@sapper/server';
import { guard } from '@beyonk/sapper-rbac';
import routes from './routes';
import authMiddleware from './middlewares/auth';
import './i18n';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const app = express();

app
  .use(
    cookieParser(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    authMiddleware,
    (req, res, next) => {
      const { user } = req;
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
