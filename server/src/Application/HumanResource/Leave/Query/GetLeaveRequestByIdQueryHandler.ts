import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IDateUtils } from 'src/Application/IDateUtils';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { LeaveRequestView } from '../View/LeaveRequestView';
import { GetLeaveRequestByIdQuery } from './GetLeaveRequestByIdQuery';

@QueryHandler(GetLeaveRequestByIdQuery)
export class GetLeaveRequestByIdQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: LeaveRequestRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute(
    query: GetLeaveRequestByIdQuery
  ): Promise<LeaveRequestView> {
    const leaveRequest = await this.leaveRequestRepository.findOneById(
      query.id
    );
    if (!leaveRequest) {
      throw new LeaveRequestNotFoundException();
    }

    const user = leaveRequest.getUser();
    const moderator = leaveRequest.getModerator();
    let moderatorView: UserSummaryView;
    if (moderator) {
      moderatorView = new UserSummaryView(
        moderator.getId(),
        moderator.getFirstName(),
        moderator.getLastName()
      );
    }

    return new LeaveRequestView(
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
      leaveRequest.getComment(),
      new UserSummaryView(
        user.getId(),
        user.getFirstName(),
        user.getLastName()
      ),
      moderatorView,
      leaveRequest.getModerationComment()
    );
  }
}
