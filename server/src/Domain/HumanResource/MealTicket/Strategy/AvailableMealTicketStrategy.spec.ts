import { AvailableMealTicketStrategy } from './AvailableMealTicketStrategy';

describe('AvailableMealTicketStrategy', () => {
  it('testGetMealTicketCountForEachMonthOfTheYear', () => {
    const workedDaysOfYearByMonth = {
      '1': [
        new Date('2021-01-01'),
        new Date('2021-01-01'),
        new Date('2021-01-01')
      ],

      '2': [new Date('2021-01-01'), new Date('2021-01-01')]
    };

    const expectedResult = {
      '1': 3,
      '2': 2
    };

    expect(
      AvailableMealTicketStrategy.getMealTicketCountForEachMonthOfTheYear(
        workedDaysOfYearByMonth
      )
    ).toEqual(expectedResult);
  });
});
