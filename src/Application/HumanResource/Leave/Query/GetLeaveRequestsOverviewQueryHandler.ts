import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetLeaveRequestsOverviewQuery } from './GetLeaveRequestsOverviewQuery';
import { ILeaveRequestsOverview } from 'src/Domain/HumanResource/Leave/ILeaveRequestsOverview';
import { IDateUtils } from 'src/Application/IDateUtils';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';

@QueryHandler(GetLeaveRequestsOverviewQuery)
export class GetLeaveRequestsOverviewQueryHandler {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository
  ) {}

  public async execute(
    query: GetLeaveRequestsOverviewQuery
  ): Promise<ILeaveRequestsOverview> {
    const [startDate, endDate] = this.dateUtils.getLeaveReferencePeriodDays(
      query.date
    );

    const numDaysPerWeek = this.dateUtils.getWorkedDaysPerWeek();
    const numWeeks = this.dateUtils.getNumberOfPaidLeaveWeeks();
    const daysPerYear = numWeeks * numDaysPerWeek;
    const totalDurationTaken = await this.leaveRepository.getSumOfPaidLeaveDurationsBetween(
      startDate,
      endDate,
      query.userId
    );
    const daysTaken = this.dateUtils.getLeaveDurationAsDays(totalDurationTaken);
    const daysRemaining = daysPerYear - daysTaken;

    return {
      daysPerYear,
      daysRemaining
    };
  }
}
