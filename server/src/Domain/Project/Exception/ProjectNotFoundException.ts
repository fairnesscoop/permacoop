export class ProjectNotFoundException extends Error {
  constructor() {
    super('project.errors.not_found');
  }
}
