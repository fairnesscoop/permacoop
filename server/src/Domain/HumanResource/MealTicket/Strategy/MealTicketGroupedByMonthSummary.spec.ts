import { MealTicketGroupedByMonthSummary } from './MealTicketGroupedByMonthSummary';

describe('MealTicketGroupedByMonthSummary', () => {
  it('testShouldUpdate', () => {
    const summary = new MealTicketGroupedByMonthSummary(1, 3);
    summary.setMealTicketCount(5);
    expect(summary.mealTicketCount).toBe(5);
  });
});
