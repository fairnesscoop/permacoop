export class NotAWorkingDateException extends Error {
  constructor() {
    super(
      'human_resources.meal_tickets.errors.not_a_working_date'
    );
  }
}
