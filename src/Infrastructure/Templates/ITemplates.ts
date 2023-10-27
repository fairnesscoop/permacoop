import { NestExpressApplication } from '@nestjs/platform-express';

export interface ITemplates {
  registerViewEngine(app: NestExpressApplication, assetsRoot: string): void;

  render(name: string, context: object): string;

  markSafe(html: string): any;
}
