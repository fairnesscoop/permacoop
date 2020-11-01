export class ProjectNotFoundException extends Error {
  constructor() {
    super('crm.projects.not_found');
  }
}
