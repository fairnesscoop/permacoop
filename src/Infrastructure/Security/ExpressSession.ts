import * as passport from 'passport';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Session } from 'src/Domain/Session/Session.entity';

export async function useSession(
  app: INestApplication,
  dataSource: DataSource
) {
  // See: https://github.com/freshgiammi-lab/connect-typeorm/issues/37#issuecomment-1250381352

  const sessionStore = new TypeormStore({
    cleanupLimit: 2,
    ttl: 604800 // one week
  });

  await dataSource.initialize();

  const sessionRepository = dataSource.getRepository<Session>(Session);

  app.use(
    session({
      store: sessionStore.connect(sessionRepository),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 604800, // 1 week
        sameSite: true,
        // enable only on https
        secure: ['1', 'true'].includes(process.env.SESSION_COOKIE_SECURE || '')
      }
    })
  );

  app.use(passport.session());
}
