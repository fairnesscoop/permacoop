export class TaskNotFoundException extends Error {
  constructor() {
    super('task.errors.not_found');
  }
}
