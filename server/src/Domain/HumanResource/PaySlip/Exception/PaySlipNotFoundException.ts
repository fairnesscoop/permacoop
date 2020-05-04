export class PaySlipNotFoundException extends Error {
  constructor() {
    super('human_resource.errors.pay_slip_not_found');
  }
}
