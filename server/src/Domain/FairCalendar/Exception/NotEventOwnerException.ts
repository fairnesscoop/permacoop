export class NotEventOwnerException extends Error {
  constructor() {
    super('fair_calendar.errors.event_not_owner');
  }
}
