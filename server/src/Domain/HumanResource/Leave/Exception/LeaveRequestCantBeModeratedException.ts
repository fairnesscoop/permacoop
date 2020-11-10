export class LeaveRequestCantBeModeratedException extends Error {
  constructor() {
    super('human_resources.leaves.requests.errors.cant_be_moderated');
  }
}
