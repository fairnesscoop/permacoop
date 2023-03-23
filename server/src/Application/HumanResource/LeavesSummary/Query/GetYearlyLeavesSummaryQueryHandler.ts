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
    const leavesSummaries: LeavesSummaryView[] = [new LeavesSummaryView(420)];
    return leavesSummaries;
  }
}
