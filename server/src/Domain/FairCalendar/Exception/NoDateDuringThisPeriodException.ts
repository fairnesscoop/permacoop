export class NoDateDuringThisPeriodException extends Error {
  constructor() {
    super('fair_calendar.errors.no_date_during_this_period');
  }
}
