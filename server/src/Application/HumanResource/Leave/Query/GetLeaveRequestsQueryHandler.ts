import { QueryHandler } from '@nestjs/cqrs';
import { GetLeaveRequestsQuery } from './GetLeaveRequestsQuery';
import { Inject } from '@nestjs/common';
import { IDateUtils } from 'src/Application/IDateUtils';
import { LeaveRequestView } from '../View/LeaveRequestView';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { Pagination } from 'src/Application/Common/Pagination';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';

@QueryHandler(GetLeaveRequestsQuery)
export class GetLeaveRequestsQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute({
    page,
    status
  }: GetLeaveRequestsQuery): Promise<Pagination<LeaveRequestView>> {
    const leaveRequestViews: LeaveRequestView[] = [];
    const [
      leaveRequests,
      total
    ] = await this.leaveRequestRepository.findLeaveRequests(page, status);

    for (const leaveRequest of leaveRequests) {
      const user = leaveRequest.getUser();

      leaveRequestViews.push(
        new LeaveRequestView(
          leaveRequest.getId(),
          leaveRequest.getType(),
          leaveRequest.getStatus(),
          leaveRequest.getStartDate(),
          leaveRequest.getEndDate(),
          this.dateUtils.getLeaveDuration(
            leaveRequest.getStartDate(),
            leaveRequest.isStartsAllDay(),
            leaveRequest.getEndDate(),
            leaveRequest.isEndsAllDay()
          ),
          null,
          new UserSummaryView(
            user.getId(),
            user.getFirstName(),
            user.getLastName()
          )
        )
      );
    }

    return new Pagination<LeaveRequestView>(leaveRequestViews, total);
  }
}
