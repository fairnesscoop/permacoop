import * as path from 'path';
import * as passport from 'passport';
import * as pg from 'pg';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as connectPgSimple from 'connect-pg-simple';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ITemplates } from './Infrastructure/Templates/ITemplates';
import { flashMessages } from './Infrastructure/Templates/FlashMessages';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  const pgSession = connectPgSimple(session);

  app.use(
    session({
      store: new pgSession({
        pool: new pg.Pool({
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME
        }),
        createTableIfMissing: true
      }),
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

  // Scalingo runs apps behind a reverse proxy
  app.set('trust proxy', 1);

  const assetsDir = path.join(__dirname, '..', 'public');
  app.useStaticAssets(assetsDir);

  const viewsDir = path.join(__dirname, '..', 'templates');
  app.setBaseViewsDir(viewsDir);

  const templates: ITemplates = app.get('ITemplates');
  templates.registerViewEngine(app, '');

  app.use(flashMessages());

  await app.listen(+(process.env.PORT || 3000), '0.0.0.0');
}

bootstrap();
