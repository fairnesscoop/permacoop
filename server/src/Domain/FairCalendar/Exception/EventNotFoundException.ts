export class EventNotFoundException extends Error {
  constructor() {
    super('fair_calendar.errors.event_not_found');
  }
}
