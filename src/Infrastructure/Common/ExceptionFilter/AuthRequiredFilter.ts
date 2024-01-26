import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpException,
  ForbiddenException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RouteNameResolver } from '../ExtendedRouting/RouteNameResolver';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthRequiredFilter implements ExceptionFilter {
  constructor(private readonly resolver: RouteNameResolver) {}

  catch(error: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const routeName = this.resolver.getName(req.path);
    const loginPath = this.resolver.resolve('login');

    if (routeName === 'index') {
      res.redirect(303, loginPath);
      return;
    }

    const next = req.query['next'];

    if (routeName !== 'login') {
      res.redirect(303, `${loginPath}?next=${next || req.url}`);
    } else {
      res.locals.flash('error', error.message);
      res.status(error.getStatus());
      res.render('pages/login.njk', { next });
    }
  }
}
