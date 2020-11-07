export class TaskNotFoundException extends Error {
  constructor() {
    super('accounting.tasks.errors.not_found');
  }
}
