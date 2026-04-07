import { Inject } from '@nestjs/common';
import { User } from '../../User/User.entity';
import { ILeaveRequestRepository } from '../Repository/ILeaveRequestRepository';
import { IDateUtils } from 'src/Application/IDateUtils';

export class IsMenstrualLeaveMonthlyQuotaExceeded {
  private readonly MENSTRUAL_QUOTA_DAYS = 2; // 2 days maximum per calendar month

  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async isSatisfiedBy(
    user: User,
    startDate: string,
    startsAllDay: boolean,
    endDate: string,
    endsAllDay: boolean
  ): Promise<boolean> {
    // Calculate the duration of the new leave request
    const newLeaveDuration = this.dateUtils.getLeaveDuration(
      startDate,
      startsAllDay,
      endDate,
      endsAllDay
    );

    // Get the start and end dates as Date objects to extract year/month
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Track months we've already checked to avoid duplicates
    const monthsToCheck = new Set<string>();

    // Collect all months the leave spans
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Month is 0-indexed
      monthsToCheck.add(`${year}-${month}`);

      // Move to next month
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
    }

    // Check quota for each month
    for (const monthKey of monthsToCheck) {
      const [yearStr, monthStr] = monthKey.split('-');
      const year = parseInt(yearStr);
      const month = parseInt(monthStr);

      // Get existing menstrual leave requests for this month
      const existingRequests = await this.leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        user.getId(),
        year,
        month
      );

      // Calculate total duration of existing requests
      let totalExistingDuration = 0;
      for (const request of existingRequests) {
        totalExistingDuration += this.dateUtils.getLeaveDuration(
          request.getStartDate(),
          request.isStartsAllDay(),
          request.getEndDate(),
          request.isEndsAllDay()
        );
      }

      // Check if adding the new leave would exceed the quota for this month
      if (
        totalExistingDuration + newLeaveDuration >
        this.MENSTRUAL_QUOTA_DAYS
      ) {
        return true; // Quota exceeded
      }
    }

    return false; // Quota not exceeded
  }
}
