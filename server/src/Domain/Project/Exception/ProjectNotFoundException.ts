export class ProjectNotFoundException extends Error {
  constructor() {
    super('crm.projects.errors.not_found');
  }
}
