export class QuoteNotFoundException extends Error {
  constructor() {
    super('quote.errors.not_found');
  }
}
