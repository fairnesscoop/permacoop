import {Injectable} from '@nestjs/common';
import {
  format as fnsFormat,
  isWeekend as fnsIsWeekend,
  getDaysInMonth as fnsGetDaysInMonth
} from 'date-fns';
import {IDateUtils} from 'src/Application/IDateUtils';

@Injectable()
export class DateUtilsAdapter implements IDateUtils {
  public format(date: Date, format: string): string {
    return fnsFormat(date, format);
  }

  public getDaysInMonth(date: Date): number {
    return fnsGetDaysInMonth(date);
  }

  public isWeekend(date: Date): boolean {
    return fnsIsWeekend(date);
  }

  public getCurrentDate(): Date {
    return new Date();
  }
}
