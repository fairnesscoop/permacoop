import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CalendarSecretGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  public canActivate(context: ExecutionContext): boolean {
    const configuredCalendarSecret = this.configService.get<string>(
      'CALENDAR_SECRET'
    );

    if (!configuredCalendarSecret) {
      return false;
    }

    const request: Request = context.switchToHttp().getRequest();
    const { calendar_secret } = request.query;

    return configuredCalendarSecret === calendar_secret;
  }
}
