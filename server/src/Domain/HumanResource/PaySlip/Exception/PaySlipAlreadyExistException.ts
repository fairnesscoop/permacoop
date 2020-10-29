export class PaySlipAlreadyExistException extends Error {
  constructor() {
    super('human_resources.pay_slips.errors.already_exist');
  }
}
