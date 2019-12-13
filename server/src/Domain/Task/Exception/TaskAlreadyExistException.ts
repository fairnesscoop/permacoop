export class TaskAlreadyExistException extends Error {
  constructor() {
    super('task.errors.already_exist');
  }
}
