export interface IDateUtilsAdapter {
  format(date: Date, format: string): string;
  getDaysInMonth(date: Date): number;
  isWeekend(date: Date): boolean;
}
