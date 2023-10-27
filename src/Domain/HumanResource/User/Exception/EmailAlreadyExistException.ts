export class EmailAlreadyExistException extends Error {
  constructor() {
    super('human_resources.users.errors.email_already_exist');
  }
}
