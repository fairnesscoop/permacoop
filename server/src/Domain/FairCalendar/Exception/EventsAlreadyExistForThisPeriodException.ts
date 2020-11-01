export class EventsAlreadyExistForThisPeriodException extends Error {
  constructor() {
    super('faircalendar.errors.events_already_exist_for_this_period');
  }
}
