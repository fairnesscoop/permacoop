export class EventDoesntBelongToUserException extends Error {
  constructor() {
    super('faircalendar.errors.event_doesnt_belong_to_user');
  }
}
