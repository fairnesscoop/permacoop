export class PasswordNotMatchException extends Error {
  constructor() {
    super('human_resources.users.errors.password_not_match');
  }
}
