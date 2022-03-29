export class MealTicketRemovalAlreadyExistException extends Error {
  constructor() {
    super(
      'human_resources.meal_tickets.errors.already_exist'
    );
  }
}
