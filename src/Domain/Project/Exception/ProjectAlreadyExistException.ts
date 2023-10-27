export class ProjectAlreadyExistException extends Error {
  constructor() {
    super('crm.projects.errors.already_exist');
  }
}
