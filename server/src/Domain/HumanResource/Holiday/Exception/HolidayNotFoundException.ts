export class HolidayNotFoundException extends Error {
  constructor() {
    super('human_resource.errors.holiday_not_found');
  }
}
