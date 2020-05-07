export class HolidayAlreadyExistForThisPeriodException extends Error {
  constructor() {
    super('human_resource.errors.holiday_already_exist_for_this_period');
  }
}
