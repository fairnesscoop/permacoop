export class CooperativeNotFoundException extends Error {
  constructor() {
    super('settings.errors.cooperative_not_found');
  }
}
