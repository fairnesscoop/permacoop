export class MenstrualLeaveMonthlyQuotaExceededException extends Error {
  constructor() {
    super('human_resources.leaves.requests.errors.menstrual_quota_exceeded');
  }
}
