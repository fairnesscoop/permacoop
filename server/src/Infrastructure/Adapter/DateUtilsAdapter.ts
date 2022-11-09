import { Injectable } from '@nestjs/common';
import {
  format as fnsFormat,
  isWeekend as fnsIsWeekend,
  getDaysInMonth as fnsGetDaysInMonth,
  addDays,
  getYear
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { MonthDate } from 'src/Application/Common/MonthDate';
import { IDateUtils } from 'src/Application/IDateUtils';

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

  public isAWorkingDay(date: Date): boolean {
    if (this.isWeekend(date)) {
      return false;
    }

    const workedFreeDays = this.getWorkedFreeDays(date.getFullYear());
    const formatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    for (const day of workedFreeDays) {
      const formatedDay = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

      if (formatedDate === formatedDay) {
        return false;
      }
    }

    return true;
  }

  public getCurrentDate(): Date {
    return new Date();
  }

  public getYear(date: Date): number {
    return getYear(date);
  }

  public getMonth(date: Date): MonthDate {
    return new MonthDate(date.getFullYear(), date.getMonth() + 1);
  }

  public getLastDayOfYear(date: Date): Date {
    return new Date(`${date.getFullYear()}-12-31T00:00:00.000Z`);
  }

  public getFirstDayOfYear(date: Date): Date {
    return new Date(`${date.getFullYear()}-01-01T00:00:00.000Z`);
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

    for (const day of this.getEachDayOfInterval(start, end)) {
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

  private getEachDayOfInterval(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    const dateTime: Date = start;

    for (dateTime; dateTime <= end; dateTime.setDate(dateTime.getDate() + 1)) {
      dates.push(
        new Date(
          dateTime.getFullYear(),
          dateTime.getMonth(),
          dateTime.getDate(),
          dateTime.getHours(),
          dateTime.getMinutes(),
          dateTime.getSeconds()
        )
      );
    }

    return dates;
  }

  public getWorkedFreeDays(year: number): Date[] {
    const fixedDays: Date[] = [
      new Date(`${year}-01-01T00:00:00.000Z`), // New Year's Day
      new Date(`${year}-05-01T00:00:00.000Z`), // Labour Day
      new Date(`${year}-05-08T00:00:00.000Z`), // Victory in 1945
      new Date(`${year}-07-14T00:00:00.000Z`), // National Day
      new Date(`${year}-08-15T00:00:00.000Z`), // Assumption
      new Date(`${year}-11-01T00:00:00.000Z`), // All Saints' Day
      new Date(`${year}-11-11T00:00:00.000Z`), // The Armistice
      new Date(`${year}-12-25T00:00:00.000Z`) // Christmas
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

    return zonedTimeToUtc(new Date(year, n, p), 'Etc/GMT');
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
