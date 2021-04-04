import { WorkingDayOfYearByMonth } from 'src/Infrastructure/Adapter/WorkingDayOfYearByMonth';
import { MealTicketGrouppedByMonthSummary } from './MealTicketGrouppedByMonthSummary'

export class AvailableMealTicketStrategy {
  public static getMealTicketCountForEachMonthOfTheYear =
    (workingDayOfYearByMonth: WorkingDayOfYearByMonth[]): MealTicketGrouppedByMonthSummary[] => {
      return workingDayOfYearByMonth.map(item => {
        const summary = new MealTicketGrouppedByMonthSummary(item.month, item.workingDays.length);
        return summary
      })
    };
}
