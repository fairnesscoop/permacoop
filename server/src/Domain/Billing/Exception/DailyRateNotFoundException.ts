export class DailyRateNotFoundException extends Error {
  constructor() {
    super('billing.errors.daily_rate_not_found');
  }
}
