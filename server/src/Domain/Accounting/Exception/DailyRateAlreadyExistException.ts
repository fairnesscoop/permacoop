export class DailyRateAlreadyExistException extends Error {
  constructor() {
    super('accounting.errors.daily_rate_already_exist');
  }
}
