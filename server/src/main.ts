import * as path from 'path';
import * as passport from 'passport';
import * as pg from 'pg';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();

  const pgPool = new pg.Pool({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new (connectPgSimple(session))({
        pool: pgPool,
        createTableIfMissing: true
      })
    }),
    passport.session()
  );

  const assetsDir = path.join(__dirname, '..', 'public');
  app.useStaticAssets(assetsDir, { prefix: '/public' });

  const viewsDir = path.join(__dirname, '..', 'templates');
  nunjucks.configure(viewsDir, { express });
  app.setBaseViewsDir(viewsDir);
  app.setViewEngine('njk');

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
