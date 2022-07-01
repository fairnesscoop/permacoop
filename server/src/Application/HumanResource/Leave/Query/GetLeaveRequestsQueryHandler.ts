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
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

@QueryHandler(GetLeaveRequestsQuery)
export class GetLeaveRequestsQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
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
          this.canCancelLeave(currentUser, leaveRequest),
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

  private canCancelLeave(byUser: User, leaveRequest: LeaveRequest): boolean {
    if (byUser.getId() !== leaveRequest.getUser().getId()) {
      return false;
    }

    if (new Date(leaveRequest.getStartDate()) < this.dateUtils.getCurrentDate()) {
      return false;
    }

    return true;
  }
}
