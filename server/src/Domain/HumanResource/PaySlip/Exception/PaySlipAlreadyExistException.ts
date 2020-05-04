export class PaySlipAlreadyExistException extends Error {
  constructor() {
    super('accounting.errors.pay_slip_already_exist');
  }
}
