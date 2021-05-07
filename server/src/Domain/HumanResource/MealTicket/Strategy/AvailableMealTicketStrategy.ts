import { WorkingDayOfYearByMonth } from './WorkingDayOfYearByMonth';
import { MealTicketGroupedByMonthSummary } from './MealTicketGroupedByMonthSummary';

export class AvailableMealTicketStrategy {
  public static getMealTicketCountForEachMonthOfTheYear(
    workingDayOfYearByMonth: WorkingDayOfYearByMonth[]
  ): MealTicketGroupedByMonthSummary[] {
    return workingDayOfYearByMonth.map(item => {
      return new MealTicketGroupedByMonthSummary(
        item.month,
        item.workingDaysCount
      );
    });
  }
}
