export class MealTicketGroupedByMonthSummary {
  month: number;
  mealTicketCount: number;
  constructor(month: number, mealTicketCount: number) {
    this.month = month;
    this.mealTicketCount = mealTicketCount;
  }
  setMealTicketCount(count: number) {
    this.mealTicketCount = count;
  }
}
