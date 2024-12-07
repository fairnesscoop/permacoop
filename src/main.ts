import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import dataSource from './datasource';
import { ITemplates } from './Infrastructure/Templates/ITemplates';
import { flashMessages } from './Infrastructure/Templates/FlashMessages';
import { useSession } from './Infrastructure/Security/ExpressSession';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  await useSession(app, dataSource);

  // Scalingo runs apps behind a reverse proxy
  app.set('trust proxy', 1);

  const assetsDir = path.join(__dirname, '..', 'public');
  app.useStaticAssets(assetsDir);

  const viewsDir = path.join(__dirname, '..', 'templates');
  app.setBaseViewsDir(viewsDir);

  const templates: ITemplates = app.get('ITemplates');
  templates.registerViewEngine(app, '');

  app.use(flashMessages());

  const swaggerCustomOptions = {
    explorer: false,
    customCss: '.swagger-ui .topbar { background-color: black; } .swagger-ui img { display: none; }',
    customSiteTitle: 'Permacoop API',
    customfavIcon: ""
  }

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Permacoop API')
    .setDescription('Permacoop is an open source and eco design ERP solution reserved for worker-owned business.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  await app.listen(+(process.env.PORT || 3000), '0.0.0.0');
}

bootstrap();
