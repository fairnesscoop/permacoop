export class MaximumEventReachedException extends Error {
  constructor() {
    super('fair_calendar.errors.event_maximum_reached');
  }
}
