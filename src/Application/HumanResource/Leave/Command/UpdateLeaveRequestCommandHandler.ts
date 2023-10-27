import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { UpdateLeaveRequestCommand } from './UpdateLeaveRequestCommand';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { DoesLeaveRequestBelongToUser } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestBelongToUser';
import { LeaveRequestCantBeUpdatedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeUpdatedException';

@CommandHandler(UpdateLeaveRequestCommand)
export class UpdateLeaveRequestCommandHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    private readonly doesLeaveRequestBelongToUser: DoesLeaveRequestBelongToUser
  ) {}

  public async execute(command: UpdateLeaveRequestCommand): Promise<string> {
    const {
      id,
      type,
      startDate,
      startsAllDay,
      endDate,
      endsAllDay,
      comment,
      user
    } = command;

    const leaveRequest = await this.leaveRequestRepository.findOneById(id);

    if (!leaveRequest) {
      throw new LeaveRequestNotFoundException();
    }

    if (
      false ===
      this.doesLeaveRequestBelongToUser.isSatisfiedBy(leaveRequest, user)
    ) {
      throw new LeaveRequestCantBeUpdatedException();
    }

    leaveRequest.update(
      type,
      startDate,
      startsAllDay,
      endDate,
      endsAllDay,
      comment
    );
    await this.leaveRequestRepository.save(leaveRequest);

    return leaveRequest.getId();
  }
}
