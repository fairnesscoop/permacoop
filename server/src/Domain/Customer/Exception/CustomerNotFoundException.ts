export class CustomerNotFoundException extends Error {
  constructor() {
    super('customer.errors.not_found');
  }
}
