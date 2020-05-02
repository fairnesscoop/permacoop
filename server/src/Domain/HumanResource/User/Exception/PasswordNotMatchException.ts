export class PasswordNotMatchException extends Error {
  constructor() {
    super('user.errors.password_not_match');
  }
}
