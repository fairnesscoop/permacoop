import { MonthDate } from './Common/MonthDate';

export interface IDateUtils {
  format(date: Date, format: string): string;
  getDaysInMonth(date: Date): number;
  isWeekend(date: Date): boolean;
  getCurrentDate(): Date;
  getCurrentDateToISOString(): string;
  getWorkedDaysDuringAPeriod(start: Date, end: Date): Date[];
  isAWorkingDay(date: Date): boolean;
  getWorkedFreeDays(year: number): Date[];
  getEasterDate(year: number): Date;
  getLeaveDuration(
    startDate: string,
    isStartsAllDay: boolean,
    endDate: string,
    isEndsAllDay: boolean
  ): number;
  addDaysToDate(date: Date, days: number): Date;
  getYear(date: Date): number;
  getMonth(date: Date): MonthDate;
  getLastDayOfYear(date: Date): Date;
  getFirstDayOfYear(date: Date): Date;
}
