import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import * as helmet from 'helmet';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
