export class UserNotFoundException extends Error {
  constructor() {
    super('user.errors.not_found');
  }
}
