import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { FileSystemLoader, Environment, TemplateCallback } from 'nunjucks';
import { getNamedRoutes } from '../Routing/WithName';

type ContextProcessorFn = (
  ctx: Record<string, any>,
  req: Request,
  res: Response
) => void;

export const nunjucks = async (
  app: NestExpressApplication,
  { watch } = { watch: false }
) => {
  const express = app.getHttpAdapter().getInstance();

  const loader = new FileSystemLoader(express.get('views'), { watch });
  const env = new Environment(loader);

  const engine = (
    name: string,
    ctx: Record<string, any>,
    cb: TemplateCallback<string>
  ) => {
    env.render(name, { ...ctx, ...ctx._locals.njkCtx }, cb);
  };

  const ctxProcessors: ContextProcessorFn[] = [
    (ctx, req, _res) => {
      ctx.req = req;
      (ctx.path = (name: string, params: Record<string, any> = {}) => {
        let path = nameToPath[name];
        if (!path) {
          return '#';
        }
        Object.entries(params).forEach(([name, value]) => {
          path = path.replace(`:${name}`, value.toString());
        });
        return path;
      }),
        (ctx.view_name = pathToName[req.url] ?? null);
    }
  ];

  const nameToPath = {};
  const pathToName = {};

  getNamedRoutes(app).forEach(({ name, path }) => {
    nameToPath[name] = path;
    pathToName[path] = name;
  });

  app.use((req: Request, res: Response, next: NextFunction): void => {
    const ctx = (res.locals.njkCtx = res.locals.njkCtx ?? {});
    ctxProcessors.forEach(fn => fn(ctx, req, res));
    next();
  });

  return {
    env,
    engine,
    contextProcessor: (fn: ContextProcessorFn) => {
      ctxProcessors.push(fn);
    }
  };
};
