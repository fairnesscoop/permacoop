export interface IDateUtils {
  format(date: Date, format: string): string;
  getDaysInMonth(date: Date): number;
  isWeekend(date: Date): boolean;
  getCurrentDate(): Date;
  getCurrentDateToISOString(): string;
}
