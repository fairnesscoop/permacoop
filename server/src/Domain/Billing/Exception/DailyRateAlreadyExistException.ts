export class DailyRateAlreadyExistException extends Error {
  constructor() {
    super('billing.errors.daily_rate_already_exist');
  }
}
