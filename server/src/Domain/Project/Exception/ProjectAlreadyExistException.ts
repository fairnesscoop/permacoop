export class ProjectAlreadyExistException extends Error {
  constructor() {
    super('crm.projects.already_exist');
  }
}
