import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;

    if (!req.user) {
      const res = context.switchToHttp().getResponse() as Response;
      res.redirect(303, '/login');
      return false;
    }

    return true;
  }
}
