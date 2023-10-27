export class CustomerAlreadyExistException extends Error {
  constructor() {
    super('crm.customers.errors.already_exist');
  }
}
