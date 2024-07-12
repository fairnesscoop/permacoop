import { Injectable } from '@nestjs/common';
import {
  format as fnsFormat,
  isWeekend as fnsIsWeekend,
  getDaysInMonth as fnsGetDaysInMonth,
  eachDayOfInterval,
  addDays,
  isWeekend
} from 'date-fns';
import { MonthDate } from 'src/Application/Common/MonthDate';
import { IDateUtils } from 'src/Application/IDateUtils';

@Injectable()
export class DateUtilsAdapter implements IDateUtils {
  private makeDate(year: number, month: number, day: number): Date {
    /**
     * This creates a date in UTC timezone.
     *
     * The intent is to remedy possible timezone issues.
     *
     * Indeed, you might be tempted to write code like this:
     *
     * ```js
     * const d = new Date(year, month, day);
     * ```
     *
     * Sadly, this is wrong.
     *
     * Indeed, if your computer's (or the server's) timezone is not UTC, then
     * the actual `day` stored in `d` might be different.
     *
     * For example, if your computer is on UTC+1 (Paris time), then..
     *
     * ```js
     * > new Date(2022, 11, 14).toISOString() // Dec 14th, 2022
     * 2022-12-13T23:00:00.000Z // Oops, it was stored as Dec 13th!
     * ```
     *
     * (Yes, timezones are a bit of a pain.)
     *
     * To remedy this, we create a date from an ISO date string (yyyy-mm-dd),
     * with leading zero padding and all that.
     *
     * JavaScript's `Date()` will properly interpret this as an UTC-timezoned date.
     */
    const fMonth = String(month).padStart(2, '0');
    const fDay = String(day).padStart(2, '0');
    return new Date(`${year}-${fMonth}-${fDay}`);
  }

  public format(date: Date, format: string): string {
    return fnsFormat(date, format);
  }

  public getDaysInMonth(date: Date): number {
    return fnsGetDaysInMonth(date);
  }

  public getWeekDaysOfMonth(date: Date): Date[] {
    return eachDayOfInterval({
      start: new Date(date.getFullYear(), date.getUTCMonth(), 1),
      end: new Date(
        date.getFullYear(),
        date.getUTCMonth(),
        this.getDaysInMonth(date)
      )
    }).filter(day => !isWeekend(day));
  }

  public isWeekend(date: Date): boolean {
    return fnsIsWeekend(date);
  }

  public isAWorkingDay(date: Date): boolean {
    if (this.isWeekend(date)) {
      return false;
    }

    const workedFreeDays = this.getWorkedFreeDays(this.getYear(date));
    const formatedDate = this.format(date, 'yyyy-MM-dd');

    for (const day of workedFreeDays) {
      const formatedDay = this.format(day, 'yyyy-MM-dd');

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
    return date.getUTCFullYear();
  }

  public getMonth(date: Date): MonthDate {
    return new MonthDate(date.getUTCFullYear(), date.getUTCMonth() + 1);
  }

  public getLastDayOfYear(date: Date): Date {
    return this.makeDate(this.getYear(date), 12, 31);
  }

  public getFirstDayOfYear(date: Date): Date {
    return this.makeDate(this.getYear(date), 1, 1);
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

    for (let year = this.getYear(start); year <= this.getYear(end); year++) {
      workedFreeDays.push(...this.getWorkedFreeDays(year));
    }

    for (let day of eachDayOfInterval({ start, end })) {
      // date-fns returns local-timezone dates. Be sure to convert to
      // UTC-timezoned dates for ISO string comparison with work-free days.
      day = new Date(this.format(day, 'yyyy-MM-dd'));

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

  public getWorkedFreeDays(year: number): Date[] {
    const fixedDays: Date[] = [
      this.makeDate(year, 1, 1), // New Year's Day
      this.makeDate(year, 5, 1), // Labour Day
      this.makeDate(year, 5, 8), // Victory in 1945
      this.makeDate(year, 7, 14), // National Day
      this.makeDate(year, 8, 15), // Assumption
      this.makeDate(year, 11, 1), // All Saints' Day
      this.makeDate(year, 11, 11), // The Armistice
      this.makeDate(year, 12, 25) // Christmas
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
    const n = Math.floor(n0 / 31);
    const p = (n0 % 31) + 1;

    return this.makeDate(year, n, p);
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

  /**
   * @param duration Duration in minutes
   * @returns Duration in days
   */
  public getLeaveDurationAsDays(duration: number) {
    return duration / 420;
  }

  getLeaveReferencePeriodDays(date: Date): [Date, Date] {
    // Reference period is between June 1st and May 31st.

    let startDate = this.makeDate(this.getYear(date), 6, 1);

    if (startDate > date) {
      startDate = this.makeDate(this.getYear(date) - 1, 6, 1);
    }

    let endDate = this.makeDate(this.getYear(date), 5, 31);

    if (endDate < date) {
      endDate = this.makeDate(this.getYear(date) + 1, 5, 31);
    }

    return [startDate, endDate];
  }

  getWorkedDaysPerWeek(): number {
    return 5;
  }

  getNumberOfPaidLeaveWeeks(): number {
    return 7;
  }
}
