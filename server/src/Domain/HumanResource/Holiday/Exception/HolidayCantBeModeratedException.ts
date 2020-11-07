export class HolidayCantBeModeratedException extends Error {
  constructor() {
    super('human_resources.holidays.errors.cant_be_moderated');
  }
}
