export class MealTicketRemovalAlreadyExistException extends Error {
  constructor() {
    super('human_resources.meal_ticket.meal_ticket_removal.errors.already_exist');
  }
}
