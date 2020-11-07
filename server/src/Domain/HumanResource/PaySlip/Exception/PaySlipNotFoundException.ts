export class PaySlipNotFoundException extends Error {
  constructor() {
    super('human_resources.pay_slips.errors.not_found');
  }
}
