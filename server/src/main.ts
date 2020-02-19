import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import * as helmet from 'helmet';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const options = new DocumentBuilder()
    .setTitle('Permacoop')
    .setBasePath('api')
    .setDescription('Open-source ERP for cooperatives')
    .setVersion('1.0.0')
    .addBearerAuth('Authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
