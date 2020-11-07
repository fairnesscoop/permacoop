export class DailyRateNotFoundException extends Error {
  constructor() {
    super('accounting.daily_rates.errors.not_found');
  }
}
