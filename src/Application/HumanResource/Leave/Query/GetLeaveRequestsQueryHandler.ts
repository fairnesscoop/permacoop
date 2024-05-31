import { QueryHandler } from '@nestjs/cqrs';
import { GetLeaveRequestsQuery } from './GetLeaveRequestsQuery';
import { Inject } from '@nestjs/common';
import { IDateUtils } from 'src/Application/IDateUtils';
import { LeaveRequestView } from '../View/LeaveRequestView';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { Pagination } from 'src/Application/Common/Pagination';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { CanLeaveRequestBeCancelled } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeCancelled';

@QueryHandler(GetLeaveRequestsQuery)
export class GetLeaveRequestsQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canLeaveRequestBeCancelled: CanLeaveRequestBeCancelled
  ) {}

  public async execute({
    currentUserId,
    page,
    status
  }: GetLeaveRequestsQuery): Promise<Pagination<LeaveRequestView>> {
    const leaveRequestViews: LeaveRequestView[] = [];
    const [
      leaveRequests,
      total
    ] = await this.leaveRequestRepository.findLeaveRequests(page, status);

    const currentUser = await this.userRepository.findOneById(currentUserId);
    if (!currentUser) {
      throw new UserNotFoundException();
    }

    for (const leaveRequest of leaveRequests) {
      const leaveUser = leaveRequest.getUser();

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
          this.canLeaveRequestBeCancelled.isSatisfiedBy(
            currentUser,
            leaveRequest
          ),
          null,
          new UserSummaryView(
            leaveUser.getId(),
            leaveUser.getFirstName(),
            leaveUser.getLastName()
          )
        )
      );
    }

    return new Pagination<LeaveRequestView>(leaveRequestViews, total);
  }
}
