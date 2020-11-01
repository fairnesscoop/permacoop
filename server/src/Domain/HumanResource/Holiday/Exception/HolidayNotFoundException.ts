export class HolidayNotFoundException extends Error {
  constructor() {
    super('human_resources.holidays.errors.not_found');
  }
}
