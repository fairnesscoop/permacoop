export class EmailAlreadyExistException extends Error {
  constructor() {
    super('user.errors.email_already_exist');
  }
}
