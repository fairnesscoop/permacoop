import { Injectable } from '@nestjs/common';
import {
  format as fnsFormat,
  isWeekend as fnsIsWeekend,
  getDaysInMonth as fnsGetDaysInMonth,
  eachDayOfInterval,
  addDays,
  getYear
} from 'date-fns';
import { IDateUtils } from 'src/Application/IDateUtils';
import { WorkingDayOfYearByMonth } from './WorkingDayOfYearByMonth';

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

  public getYear(date: Date): number {
    return getYear(date);
  }

  public getLastDayOfYear(date: Date): Date {
    return new Date(`${getYear(date)}/12/31`);
  }

  public getFirstDayOfYear(date: Date): Date {
    return new Date(`${getYear(date)}/01/01`);
  }

  public getCurrentDateToISOString(): string {
    return this.getCurrentDate().toISOString();
  }

  public addDaysToDate(date: Date, days: number): Date {
    return addDays(date, days);
  }

  public getWorkedDaysDuringAPeriod(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    const workedFreeDays: Date[] = [];

    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
      workedFreeDays.push(...this.getWorkedFreeDays(year));
    }

    for (const day of eachDayOfInterval({ start, end })) {
      if (
        this.isWeekend(day) ||
        workedFreeDays.filter(d => d.toISOString() === day.toISOString())
          .length > 0
      ) {
        continue;
      }

      dates.push(day);
    }

    return dates;
  }

  public getAllWorkingDayOfYearByMonth(date: Date): WorkingDayOfYearByMonth[] {
    const lastDayOfYear = this.getLastDayOfYear(date);
    const firstDayOfYear = this.getFirstDayOfYear(date);

    const workedDaysOfYear = this.getWorkedDaysDuringAPeriod(
      firstDayOfYear,
      lastDayOfYear
    );

    const defaultValues: WorkingDayOfYearByMonth[] = [];

    return workedDaysOfYear.reduce((prev, next) => {
      const currentMonth = next.getMonth() + 1;
      const itemWithMonth = prev.find(item => item.month === currentMonth);

      if (itemWithMonth) {
        itemWithMonth.addOneWorkingDay();
        return prev;
      }
      const working = new WorkingDayOfYearByMonth(currentMonth);
      working.addOneWorkingDay();

      return [...prev, working];
    }, defaultValues);

  }

  public getWorkedFreeDays(year: number): Date[] {
    const fixedDays: Date[] = [
      new Date(`${year}-01-01`), // New Year's Day
      new Date(`${year}-05-01`), // Labour Day
      new Date(`${year}-05-08`), // Victory in 1945
      new Date(`${year}-07-14`), // National Day
      new Date(`${year}-08-15`), // Assumption
      new Date(`${year}-11-01`), // All Saints' Day
      new Date(`${year}-11-11`), // The Armistice
      new Date(`${year}-12-25`) // Christmas
    ];

    const easterDate = this.getEasterDate(year);
    const easterDays: Date[] = [
      addDays(easterDate, 1), // Easter Monday
      addDays(easterDate, 39) // Ascension
    ];

    return [...fixedDays, ...easterDays];
  }

  public getEasterDate(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n0 = h + l + 7 * m + 114;
    const n = Math.floor(n0 / 31) - 1;
    const p = (n0 % 31) + 1;

    return new Date(year, n, p);
  }

  public getLeaveDuration(
    startDate: string,
    isStartsAllDay: boolean,
    endDate: string,
    isEndsAllDay: boolean
  ): number {
    let duration = this.getWorkedDaysDuringAPeriod(
      new Date(startDate),
      new Date(endDate)
    ).length;

    if (false === isStartsAllDay) {
      duration -= 0.5;
    }

    if (false === isEndsAllDay && duration > 0.5) {
      duration -= 0.5;
    }

    return duration;
  }
}
