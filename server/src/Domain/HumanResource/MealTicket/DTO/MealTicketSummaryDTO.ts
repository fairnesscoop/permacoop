export class MealTicketSummaryDTO {
  readonly total: number;
  readonly mealTicketRemovalCount: number;
  readonly base: number;
  readonly month: number;
  constructor(
    month: number,
    base: number,
    mealTicketRemovalCount: number,
    total: number
  ) {
    this.month = month;
    this.total = total;
    this.base = base;
    this.mealTicketRemovalCount = mealTicketRemovalCount;
  }
}
