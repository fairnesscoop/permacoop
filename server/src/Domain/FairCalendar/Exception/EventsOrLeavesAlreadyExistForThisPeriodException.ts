export class EventsOrLeavesAlreadyExistForThisPeriodException extends Error {
  constructor() {
    super('faircalendar.errors.events_or_leaves_already_exist_for_this_period');
  }
}
