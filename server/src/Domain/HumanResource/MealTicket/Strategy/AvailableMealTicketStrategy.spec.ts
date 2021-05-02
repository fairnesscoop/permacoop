import { WorkingDayOfYearByMonth } from 'src/Infrastructure/Adapter/WorkingDayOfYearByMonth';
import { AvailableMealTicketStrategy } from './AvailableMealTicketStrategy';
import { MealTicketGrouppedByMonthSummary } from './MealTicketGrouppedByMonthSummary';

describe('AvailableMealTicketStrategy', () => {
  it('testGetMealTicketCountForEachMonthOfTheYear', () => {
    const workedDaysOfYearByMonth1 = new WorkingDayOfYearByMonth(1);

    workedDaysOfYearByMonth1.addOneWorkingDay()

    const expectedResult = new MealTicketGrouppedByMonthSummary(1, 1);

    expect(
      AvailableMealTicketStrategy.getMealTicketCountForEachMonthOfTheYear([
        workedDaysOfYearByMonth1
      ])
    ).toEqual([expectedResult]);
  });
});
