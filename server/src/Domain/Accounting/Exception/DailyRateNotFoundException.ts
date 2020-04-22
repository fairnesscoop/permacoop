export class DailyRateNotFoundException extends Error {
  constructor() {
    super('accounting.errors.daily_rate_not_found');
  }
}
