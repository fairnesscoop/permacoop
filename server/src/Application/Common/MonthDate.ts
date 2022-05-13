import { lastDayOfMonth } from 'date-fns';

export class MonthDate {
  constructor(public readonly year: number, public readonly month: number) {}

  getFirstDay(): Date {
    const date = new Date();
    date.setFullYear(this.year);
    date.setMonth(this.month - 1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setDate(1);

    return date;
  }

  getLastDay(): Date {
    const date = new Date();
    date.setFullYear(this.year);
    date.setMonth(this.month - 1);

    return lastDayOfMonth(date);
  }
}
