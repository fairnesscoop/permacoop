export class PayStubAlreadyExistException extends Error {
  constructor() {
    super('accounting.errors.pay_stub_already_exist');
  }
}
