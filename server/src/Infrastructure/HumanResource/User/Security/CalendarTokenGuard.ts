import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CalendarTokenGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  public canActivate(context: ExecutionContext): boolean {
    const configuredCalendarToken = this.configService.get<string>(
      'CALENDAR_TOKEN'
    );

    if (!configuredCalendarToken) {
      return false;
    }

    const request: Request = context.switchToHttp().getRequest();
    const { token } = request.query;

    return configuredCalendarToken === token;
  }
}
