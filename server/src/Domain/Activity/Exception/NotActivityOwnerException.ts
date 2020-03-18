export class NotActivityOwnerException extends Error {
  constructor() {
    super('activity.errors.not_owner');
  }
}
