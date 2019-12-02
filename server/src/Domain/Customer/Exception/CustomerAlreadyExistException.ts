export class CustomerAlreadyExistException extends Error {
  constructor() {
    super('customer.errors.already_exist');
  }
}
