export class LeaveRequestNotFoundException extends Error {
  constructor() {
    super('human_resources.leaves.requests.errors.not_found');
  }
}
