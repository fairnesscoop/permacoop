import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpException,
  ForbiddenException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthRequiredFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.locals.flash('error', error.message);
    response.status(error.getStatus());
    response.render('pages/login.njk');
  }
}
