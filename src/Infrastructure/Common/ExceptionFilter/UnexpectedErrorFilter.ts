import { STATUS_CODES } from 'http';
import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';

@Catch(Error)
export class UnexpectedErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost): void {
    const statusCode = error instanceof HttpException ? error.getStatus() : 500;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.statusCode = statusCode;

    if (process.env.NODE_ENV !== 'production') {
      response.render('errors/http_error_debug.njk', {
        message: error.stack,
        statusCode,
        errorName: STATUS_CODES[statusCode]
      });
    } else {
      response.render('errors/http_error_production.njk', {
        message: error.message,
        statusCode,
        errorName: STATUS_CODES[statusCode]
      });
    }
  }
}
