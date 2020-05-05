export class PaySlipAlreadyExistException extends Error {
  constructor() {
    super('human_resource.errors.pay_slip_already_exist');
  }
}
