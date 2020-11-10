export class LeaveRequestAlreadyExistForThisPeriodException extends Error {
  constructor() {
    super('human_resources.leaves.requests.errors.already_exist_for_this_period');
  }
}
