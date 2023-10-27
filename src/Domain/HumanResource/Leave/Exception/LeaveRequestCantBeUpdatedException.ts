export class LeaveRequestCantBeUpdatedException extends Error {
  constructor() {
    super('human_resources.leaves.requests.errors.cant_be_updated');
  }
}
