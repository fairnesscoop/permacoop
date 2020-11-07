export class QuoteNotFoundException extends Error {
  constructor() {
    super('accounting.quotes.errors.not_found');
  }
}
