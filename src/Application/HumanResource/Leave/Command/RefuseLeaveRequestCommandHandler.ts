import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { RefuseLeaveRequestCommand } from './RefuseLeaveRequestCommand';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { IDateUtils } from 'src/Application/IDateUtils';
import { LeaveRequestCantBeModeratedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeModeratedException';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';

@CommandHandler(RefuseLeaveRequestCommand)
export class RefuseLeaveRequestCommandHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canLeaveRequestBeModerated: CanLeaveRequestBeModerated
  ) {}

  public async execute(command: RefuseLeaveRequestCommand): Promise<string> {
    const { moderator, id, moderationComment } = command;

    const leaveRequest = await this.leaveRequestRepository.findOneById(id);
    if (!leaveRequest) {
      throw new LeaveRequestNotFoundException();
    }

    if (
      false ===
      this.canLeaveRequestBeModerated.isSatisfiedBy(leaveRequest, moderator)
    ) {
      throw new LeaveRequestCantBeModeratedException();
    }

    leaveRequest.refuse(
      moderator,
      this.dateUtils.getCurrentDateToISOString(),
      moderationComment
    );
    await this.leaveRequestRepository.save(leaveRequest);

    return leaveRequest.getId();
  }
}
