import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
const dateUtils: DateUtilsAdapter = new DateUtilsAdapter();

export class DoesLeaveRequestLackPostponedWorkedFreeDays {
  public isSatisfiedBy(startDate: string, endDate: string): boolean {
    const workedFreeDays = dateUtils.getWorkedFreeDaysDuringAPeriod(
      new Date(startDate),
      new Date(endDate)
    );

    return workedFreeDays.some(workedFreeDay =>
      dateUtils.isWeekend(workedFreeDay)
    );
  }
}
