export class MealTicketsPerMonthView {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly mealTickets: number,
    public readonly mealTicketRemovals: number
  ) {}
}
