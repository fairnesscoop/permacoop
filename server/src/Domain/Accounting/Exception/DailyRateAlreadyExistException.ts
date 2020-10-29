export class DailyRateAlreadyExistException extends Error {
  constructor() {
    super('accounting.daily_rates.errors.already_exist');
  }
}
