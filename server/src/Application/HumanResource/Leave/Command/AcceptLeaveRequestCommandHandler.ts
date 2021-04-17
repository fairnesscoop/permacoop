import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { IDateUtils } from 'src/Application/IDateUtils';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { AcceptLeaveRequestCommand } from './AcceptLeaveRequestCommand';
import { IEventBus } from 'src/Application/IEventBus';
import { AcceptedLeaveRequestEvent } from '../Event/AcceptedLeaveRequestEvent';
import { DoesEventsOrLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesEventsOrLeaveExistForPeriod';
import { EventsOrLeavesAlreadyExistForThisPeriodException } from 'src/Domain/FairCalendar/Exception/EventsOrLeavesAlreadyExistForThisPeriodException';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { LeaveRequestCantBeModeratedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeModeratedException';

@CommandHandler(AcceptLeaveRequestCommand)
export class AcceptLeaveRequestCommandHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canLeaveRequestBeModerated: CanLeaveRequestBeModerated,
    private readonly doesEventsOrLeaveExistForPeriod: DoesEventsOrLeaveExistForPeriod
  ) {}

  public async execute(command: AcceptLeaveRequestCommand): Promise<string> {
    const { moderator, moderationComment, id } = command;

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

    if (
      true ===
      (await this.doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
        leaveRequest.getUser(),
        leaveRequest.getStartDate(),
        leaveRequest.getEndDate()
      ))
    ) {
      throw new EventsOrLeavesAlreadyExistForThisPeriodException();
    }

    leaveRequest.accept(
      moderator,
      this.dateUtils.getCurrentDateToISOString(),
      moderationComment
    );

    await this.leaveRequestRepository.save(leaveRequest);
    this.eventBus.publish(new AcceptedLeaveRequestEvent(leaveRequest));

    return leaveRequest.getId();
  }
}
