export class ProjectOrTaskMissingException extends Error {
  constructor() {
    super('fair_calendar.errors.project_or_task_missing');
  }
}
