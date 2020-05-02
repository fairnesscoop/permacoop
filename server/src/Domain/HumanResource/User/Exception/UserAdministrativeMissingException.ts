export class UserAdministrativeMissingException extends Error {
  constructor() {
    super('user.errors.user_administrative_missing');
  }
}
