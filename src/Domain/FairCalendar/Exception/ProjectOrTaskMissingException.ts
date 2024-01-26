export class ProjectOrTaskMissingException extends Error {
  constructor() {
    super('faircalendar.errors.project_or_task_missing');
  }
}
