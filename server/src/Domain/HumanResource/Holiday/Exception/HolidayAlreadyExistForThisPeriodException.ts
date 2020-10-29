export class HolidayAlreadyExistForThisPeriodException extends Error {
  constructor() {
    super('human_resources.holidays.errors.already_exist_for_this_period');
  }
}
