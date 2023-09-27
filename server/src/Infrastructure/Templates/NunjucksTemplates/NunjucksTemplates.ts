import { Inject, Injectable } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Environment, FileSystemLoader, TemplateCallback } from 'nunjucks';
import { runtime } from 'nunjucks';
import { ITemplates } from '../ITemplates';
import { RouteNameResolver } from '../../Common/ExtendedRouting/RouteNameResolver';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';
import { formatFullName } from '../../Common/Utils/formatUtils';
import {
  formatDate,
  formatHtmlDate,
  minutesToHours
} from '../../Common/Utils/dateUtils';
import { ArrayUtils } from '../../Common/Utils/ArrayUtils';
import { TablesExtension } from './TablesExtension';

@Injectable()
export class NunjucksTemplates implements ITemplates {
  private env: Environment;

  constructor(
    private readonly resolver: RouteNameResolver,
    @Inject('ITranslator')
    private readonly translator: ITranslator
  ) {}

  private createEnv(viewsDir: string): Environment {
    const loader = new FileSystemLoader(viewsDir, {
      watch: process.env.NODE_ENV !== 'production'
    });
    const env = new Environment(loader);

    env.addFilter('trans', (key, params = {}) =>
      this.translator.translate(key, params)
    );
    env.addFilter('startswith', (value: string | null, other: string) =>
      value ? value.startsWith(other) : false
    );
    env.addFilter('minutesToHours', minutes => minutesToHours(minutes));
    env.addFilter('fullName', obj => formatFullName(obj));
    env.addFilter('date', value => formatDate(value));
    env.addFilter('htmlDate', value => formatHtmlDate(value));
    env.addFilter('htmlYearMonth', value => formatHtmlDate(value).slice(0, 7));
    env.addFilter('zip', (left, right) => ArrayUtils.zip(left, right));
    env.addFilter('merge', (left, right) => {
      const result = {};
      for (const key in left) {
        result[key] = left[key];
      }
      for (const key in right) {
        result[key] = right[key];
      }
      return result;
    });

    env.addExtension('tables', new TablesExtension(this));

    return env;
  }

  registerViewEngine(app: NestExpressApplication, assetsRoot: string): void {
    const express = app.getHttpAdapter().getInstance();

    this.env = this.createEnv(express.get('views'));

    app.use((req: Request, res: Response, next: NextFunction): void => {
      const ctx = (res.locals.njkCtx = res.locals.njkCtx ?? {});

      ctx['req'] = req;

      ctx['path'] = (name: string, params: object = {}) => {
        try {
          return this.resolver.resolve(name, params);
        } catch {
          return '#';
        }
      };

      ctx['view_name'] = this.resolver.getName(req.url);

      ctx['asset'] = (path: string) => `${assetsRoot}/${path}`;

      next();
    });

    app.engine(
      'njk',
      (
        name: string,
        ctx: Record<string, any>,
        cb: TemplateCallback<string>
      ) => {
        this.env.render(name, { ...ctx, ...ctx._locals.njkCtx }, cb);
      }
    );

    app.setViewEngine('njk');
  }

  public render(name: string, context: object): string {
    return this.env.render(name, context);
  }

  public markSafe(html: string): any {
    return new runtime.SafeString(html);
  }
}
