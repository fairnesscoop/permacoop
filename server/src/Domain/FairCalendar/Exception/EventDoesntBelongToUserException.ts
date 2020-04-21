export class EventDoesntBelongToUserException extends Error {
  constructor() {
    super('fair_calendar.errors.event_doesnt_belong_to_user');
  }
}
