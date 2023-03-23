import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetYearlyLeavesSummaryQuery } from './GetYearlyLeavesSummaryQuery';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';
import { LeavesSummaryView } from '../View/LeavesSummaryView';

@QueryHandler(GetYearlyLeavesSummaryQuery)
export class GetYearlyLeavesSummaryQueryHandler {
  constructor(
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository
  ) {}

  public async execute(
    query: GetYearlyLeavesSummaryQuery
  ): Promise<LeavesSummaryView[]> {
    const yearlyLeavesSummaries = await this.leaveRepository.yearlyLeavesSummary(
      2023
    );

    const MAXIMUM_LEAVE_TIME_ALLOWED = 420 * 5 * 7;

    const leavesSummaryViews = yearlyLeavesSummaries.map(
      ({ total_time, first_name, last_name }) =>
        new LeavesSummaryView(
          total_time,
          MAXIMUM_LEAVE_TIME_ALLOWED - total_time,
          first_name,
          last_name
        )
    );

    return leavesSummaryViews;
  }
}
