export class ProjectAlreadyExistException extends Error {
  constructor() {
    super('project.errors.already_exist');
  }
}
