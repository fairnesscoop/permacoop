import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteLeaveRequestCommand } from './DeleteLeaveRequestCommand';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { CanLeaveRequestBeRemoved } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeRemoved';
import { LeaveRequestCantBeRemovedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeRemovedException';

@CommandHandler(DeleteLeaveRequestCommand)
export class DeleteLeaveRequestCommandHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    private readonly canLeaveRequestBeRemoved: CanLeaveRequestBeRemoved
  ) {}

  public async execute(command: DeleteLeaveRequestCommand): Promise<void> {
    const { owner, id } = command;

    const leaveRequest = await this.leaveRequestRepository.findOneById(id);
    if (!leaveRequest) {
      throw new LeaveRequestNotFoundException();
    }

    if (
      false === this.canLeaveRequestBeRemoved.isSatisfiedBy(leaveRequest, owner)
    ) {
      throw new LeaveRequestCantBeRemovedException();
    }

    this.leaveRequestRepository.remove(leaveRequest);
  }
}
