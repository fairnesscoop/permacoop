import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { IDateUtils } from 'src/Application/IDateUtils';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { AcceptLeaveRequestCommand } from './AcceptLeaveRequestCommand';
import { IEventBus } from 'src/Application/IEventBus';
import { AcceptedLeaveRequestEvent } from '../Event/AcceptedLeaveRequestEvent';
import { DoesEventsExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesEventsExistForPeriod';
import { EventsAlreadyExistForThisPeriodException } from 'src/Domain/FairCalendar/Exception/EventsAlreadyExistForThisPeriodException';
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
    private readonly doesEventsExistForPeriod: DoesEventsExistForPeriod
  ) {}

  public async execute(command: AcceptLeaveRequestCommand): Promise<string> {
    const { moderator, moderationComment, id } = command;

    const leaveRequest = await this.leaveRequestRepository.findOneById(id);
    if (!leaveRequest) {
      throw new LeaveRequestNotFoundException();
    }

    if (
      false === this.canLeaveRequestBeModerated.isSatisfiedBy(leaveRequest, moderator)
    ) {
      throw new LeaveRequestCantBeModeratedException();
    }

    if (
      true ===
      (await this.doesEventsExistForPeriod.isSatisfiedBy(
        leaveRequest.getUser(),
        leaveRequest.getStartDate(),
        leaveRequest.getEndDate()
      ))
    ) {
      throw new EventsAlreadyExistForThisPeriodException();
    }

    // todo : check for leaves presence

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
