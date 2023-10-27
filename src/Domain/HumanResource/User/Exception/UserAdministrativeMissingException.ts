export class UserAdministrativeMissingException extends Error {
  constructor() {
    super('human_resources.users.errors.user_administrative_missing');
  }
}
