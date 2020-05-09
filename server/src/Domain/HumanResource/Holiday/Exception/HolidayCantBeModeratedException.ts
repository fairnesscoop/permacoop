export class HolidayCantBeModeratedException extends Error {
  constructor() {
    super('human_resource.errors.holiday_cant_be_moderated');
  }
}
