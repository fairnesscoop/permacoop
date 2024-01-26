export class EventNotFoundException extends Error {
  constructor() {
    super('faircalendar.errors.event_not_found');
  }
}
