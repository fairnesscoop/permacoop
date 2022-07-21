export class InterestRateNotFoundException extends Error {
  constructor() {
    super('human_resources.savings_records.errors.interest_rate_not_found');
  }
}
