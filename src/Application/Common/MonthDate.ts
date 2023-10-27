import { lastDayOfMonth, format } from 'date-fns';

export class MonthDate {
  constructor(public readonly year: number, public readonly month: number) {}

  getFirstDay(): Date {
    return new Date(`${this.year}-${String(this.month).padStart(2, '0')}-01`);
  }

  getLastDay(): Date {
    const localDate = lastDayOfMonth(this.getFirstDay());
    return new Date(format(localDate, 'yyyy-MM-dd'));
  }
}
