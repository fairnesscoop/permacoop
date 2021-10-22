import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { UpdateLeaveRequestCommand } from './UpdateLeaveRequestCommand';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';

@CommandHandler(UpdateLeaveRequestCommand)
export class UpdateLeaveRequestCommandHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository
  ) { }

  public async execute(command: UpdateLeaveRequestCommand): Promise<string> {
    const {
      endDate,
      endsAllDay,
      id,
      type,
      startDate,
      startsAllDay,
      comment
    } = command;

    const leaveRequest = await this.leaveRequestRepository.findOneById(id);

    if (!leaveRequest) {
      throw new LeaveRequestNotFoundException();
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
