import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { IDateUtils } from 'src/Application/IDateUtils';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { AcceptLeaveRequestCommand } from './AcceptLeaveRequestCommand';
import { IEventBus } from 'src/Application/IEventBus';
import { AcceptedLeaveRequestEvent } from '../Event/AcceptedLeaveRequestEvent';
import { DoesLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesLeaveExistForPeriod';
import { EventsOrLeavesAlreadyExistForThisPeriodException } from 'src/Domain/FairCalendar/Exception/EventsOrLeavesAlreadyExistForThisPeriodException';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { LeaveRequestCantBeModeratedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeModeratedException';
import { CreateNotificationCommand } from 'src/Application/Notification/Command/CreateNotificationCommand';
import { NotificationType } from 'src/Domain/Notification/Notification.entity';
import { ICommandBus } from 'src/Application/ICommandBus';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';

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
    private readonly doesLeaveExistForPeriod: DoesLeaveExistForPeriod,
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('ITranslator')
    private readonly translator: ITranslator
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
      (await this.doesLeaveExistForPeriod.isSatisfiedBy(
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

    this.commandBus.execute(
      new CreateNotificationCommand(
        NotificationType.REACTION,
        this.translator.translate(
          'leave-requests-approve-notification-emoji-name'
        ),
        leaveRequest
      )
    );

    this.commandBus.execute(
      new CreateNotificationCommand(
        NotificationType.COMMENT,
        this.translator.translate(
          'leave-requests-approve-notification-message',
          {
            moderatorFirstName: moderator.getFirstName()
          }
        ),
        leaveRequest
      )
    );

    return leaveRequest.getId();
  }
}
