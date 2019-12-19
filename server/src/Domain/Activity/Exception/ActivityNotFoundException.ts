export class ActivityNotFoundException extends Error {
  constructor() {
    super('activity.errors.not_found');
  }
}
