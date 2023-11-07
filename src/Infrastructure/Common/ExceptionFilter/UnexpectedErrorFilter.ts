import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class UnexpectedErrorFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): void {
    // TODO: debug only
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.render('errors/error', { error });
    response.statusCode = 500;
    if (error['status'] === 400) {
      console.error(error);
    }
  }
}
