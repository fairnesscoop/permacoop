import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IDateUtils } from 'src/Application/IDateUtils';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { LeaveRequestDetailView } from '../View/LeaveRequestDetailView';
import { GetLeaveRequestByIdQuery } from './GetLeaveRequestByIdQuery';
import { CanLeaveRequestBeCancelled } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeCancelled';

@QueryHandler(GetLeaveRequestByIdQuery)
export class GetLeaveRequestByIdQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: LeaveRequestRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canLeaveRequestBeCancelled: CanLeaveRequestBeCancelled
  ) {}

  public async execute(
    query: GetLeaveRequestByIdQuery
  ): Promise<LeaveRequestDetailView> {
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

    return new LeaveRequestDetailView(
      leaveRequest.getId(),
      leaveRequest.getType(),
      leaveRequest.getStatus(),
      leaveRequest.getStartDate(),
      leaveRequest.isStartsAllDay(),
      leaveRequest.getEndDate(),
      leaveRequest.isEndsAllDay(),
      this.dateUtils.getLeaveDuration(
        leaveRequest.getStartDate(),
        leaveRequest.isStartsAllDay(),
        leaveRequest.getEndDate(),
        leaveRequest.isEndsAllDay()
      ),
      this.canLeaveRequestBeCancelled.isSatisfiedBy(
        query.currentUser,
        leaveRequest
      ),
      leaveRequest.getComment(),
      new UserSummaryView(
        user.getId(),
        user.getFirstName(),
        user.getLastName()
      ),
      moderatorView,
      leaveRequest.getModerateAt(),
      leaveRequest.getModerationComment()
    );
  }
}
