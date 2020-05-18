export class EventsAlreadyExistForThisPeriodException extends Error {
  constructor() {
    super('fair_calendar.errors.events_already_exist_for_this_period');
  }
}
