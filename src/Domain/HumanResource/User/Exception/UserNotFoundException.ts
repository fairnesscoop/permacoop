export class UserNotFoundException extends Error {
  constructor() {
    super('human_resources.users.errors.not_found');
  }
}
