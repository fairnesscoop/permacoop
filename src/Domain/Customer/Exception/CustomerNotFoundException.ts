export class CustomerNotFoundException extends Error {
  constructor() {
    super('crm.customers.errors.not_found');
  }
}
