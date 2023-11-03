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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const sessionPgPool = new pg.Pool({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new (connectPgSimple(session))({
        pool: sessionPgPool,
        createTableIfMissing: true
      })
    }),
    passport.session()
  );

  const assetsDir = path.join(__dirname, '..', 'public');
  app.useStaticAssets(assetsDir, { prefix: '/public' });

  const viewsDir = path.join(__dirname, '..', 'templates');
  app.setBaseViewsDir(viewsDir);

  const templates: ITemplates = app.get('ITemplates');
  templates.registerViewEngine(app, '/public');

  await app.listen(+(process.env.PORT || 3000), '0.0.0.0');
}

bootstrap();
