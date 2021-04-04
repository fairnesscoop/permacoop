import { WorkingDayOfYearByMonth } from 'src/Infrastructure/Adapter/WorkingDayOfYearByMonth';
import { AvailableMealTicketStrategy } from './AvailableMealTicketStrategy';
import { MealTicketGrouppedByMonthSummary } from './MealTicketGrouppedByMonthSummary';

describe('AvailableMealTicketStrategy', () => {
  it('testGetMealTicketCountForEachMonthOfTheYear', () => {

    const workedDaysOfYearByMonth1 = new WorkingDayOfYearByMonth(1, [
      new Date('2021-01-01'),
      new Date('2021-01-01'),
      new Date('2021-01-01')])

    const expectedResult = new MealTicketGrouppedByMonthSummary(1, 3)

    expect(
      AvailableMealTicketStrategy.getMealTicketCountForEachMonthOfTheYear(
        [workedDaysOfYearByMonth1]
      )
    ).toEqual([expectedResult]);
  });
});
