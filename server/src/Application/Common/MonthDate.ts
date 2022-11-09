import { zonedTimeToUtc } from 'date-fns-tz';

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

    return zonedTimeToUtc(date, 'ETC/Utc');
  }

  getLastDay(): Date {
    const date = new Date(this.year, this.month, 1, 0, 0, 0);
    date.setDate(date.getDate() - 1);

    return zonedTimeToUtc(date, 'ETC/Utc');
  }
}
