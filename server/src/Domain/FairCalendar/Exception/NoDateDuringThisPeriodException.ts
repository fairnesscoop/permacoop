export class NoDateDuringThisPeriodException extends Error {
  constructor() {
    super('faircalendar.errors.no_date_during_this_period');
  }
}
