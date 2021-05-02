import { WorkingDayOfYearByMonth } from 'src/Infrastructure/Adapter/WorkingDayOfYearByMonth';
import { AvailableMealTicketStrategy } from './AvailableMealTicketStrategy';
import { MealTicketGroupedByMonthSummary } from './MealTicketGroupedByMonthSummary';

describe('AvailableMealTicketStrategy', () => {
  it('testGetMealTicketCountForEachMonthOfTheYear', () => {
    const workedDaysOfYearByMonth1 = new WorkingDayOfYearByMonth(1);

    workedDaysOfYearByMonth1.addOneWorkingDay()

    const expectedResult = new MealTicketGroupedByMonthSummary(1, 1);

    expect(
      AvailableMealTicketStrategy.getMealTicketCountForEachMonthOfTheYear([
        workedDaysOfYearByMonth1
      ])
    ).toEqual([expectedResult]);
  });
});
