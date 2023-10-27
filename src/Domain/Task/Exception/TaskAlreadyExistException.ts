export class TaskAlreadyExistException extends Error {
  constructor() {
    super('accounting.tasks.errors.already_exist');
  }
}
