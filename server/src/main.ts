import * as path from 'path';
import * as passport from 'passport';
import * as pg from 'pg';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { nunjucks } from './Infrastructure/Common/Templating';
import { registerFilters } from './Infrastructure/Common/Templating/filters';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const sessionPgPool = new pg.Pool({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  app.use(helmet());
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

  const translator = app.get('ITranslator');

  const njk = await nunjucks(app, { watch: !isProd });
  registerFilters(njk.env, translator);
  njk.contextProcessor((ctx, _req, _res) => {
    ctx.asset = (path: string) => `/public/${path}`;
  });
  app.engine('njk', njk.engine);
  app.setViewEngine('njk');

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
