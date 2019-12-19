export class MaximumActivityReachedException extends Error {
  constructor() {
    super('activity.errors.maximum_reached');
  }
}
