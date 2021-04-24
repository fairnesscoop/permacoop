import { MealTicketGrouppedByMonthSummary } from './MealTicketGrouppedByMonthSummary';

describe('MealTicketGrouppedByMonthSummary', () => {
  it('testShouldUpdate', () => {
    const summary = new MealTicketGrouppedByMonthSummary(1, 3);
    summary.setMealTicketCount(5);
    expect(
      summary.mealTicketCount

    ).toBe(5);
  });
});
