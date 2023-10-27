export class MaximumEventReachedException extends Error {
  constructor() {
    super('faircalendar.errors.event_maximum_reached');
  }
}
