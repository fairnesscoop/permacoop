import {Injectable} from '@nestjs/common';
import {
  format as fnsFormat,
  isWeekend as fnsIsWeekend,
  getDaysInMonth as fnsGetDaysInMonth
} from 'date-fns';
import {IDateUtilsAdapter} from 'src/Application/Adapter/IDateUtilsAdapter';

@Injectable()
export class DateUtilsAdapter implements IDateUtilsAdapter {
  public format(date: Date, format: string): string {
    return fnsFormat(date, format);
  }

  public getDaysInMonth(date: Date): number {
    return fnsGetDaysInMonth(date);
  }

  public isWeekend(date: Date): boolean {
    return fnsIsWeekend(date);
  }
}
