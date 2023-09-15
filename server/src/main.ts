import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as nunjucks from 'nunjucks';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const assetsDir = path.join(__dirname, '..', 'public');
  app.useStaticAssets(assetsDir, { prefix: '/public' });

  const viewsDir = path.join(__dirname, '..', 'templates');
  nunjucks.configure(viewsDir, { express });
  app.setBaseViewsDir(viewsDir);
  app.setViewEngine('njk');

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
