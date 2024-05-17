import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateLeaveRequestCommand } from './CreateLeaveRequestCommand';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { DoesLeaveRequestExistForPeriod } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestExistForPeriod';
import { LeaveRequestAlreadyExistForThisPeriodException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestAlreadyExistForThisPeriodException';
import { DoesLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesLeaveExistForPeriod';
import { EventsOrLeavesAlreadyExistForThisPeriodException } from 'src/Domain/FairCalendar/Exception/EventsOrLeavesAlreadyExistForThisPeriodException';
import { DoesLeaveRequestLackPostponedWorkedFreeDays } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestLackPostponedWorkedFreeDays';

@CommandHandler(CreateLeaveRequestCommand)
export class CreateLeaveRequestCommandHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository,
    private readonly doesLeaveRequestExistForPeriod: DoesLeaveRequestExistForPeriod,
    private readonly doesLeaveExistForPeriod: DoesLeaveExistForPeriod,
    private readonly DoesLeaveRequestLackPostponedWorkedFreeDays: DoesLeaveRequestLackPostponedWorkedFreeDays
  ) {}

  public async execute(command: CreateLeaveRequestCommand): Promise<string> {
    const {
      user,
      endDate,
      endsAllDay,
      type,
      startDate,
      startsAllDay
    } = command;

    let { comment } = command;

    if (
      true ===
      (await this.doesLeaveRequestExistForPeriod.isSatisfiedBy(
        user,
        startDate,
        endDate
      ))
    ) {
      throw new LeaveRequestAlreadyExistForThisPeriodException();
    }

    if (
      true ===
      (await this.doesLeaveExistForPeriod.isSatisfiedBy(
        user,
        startDate,
        endDate
      ))
    ) {
      throw new EventsOrLeavesAlreadyExistForThisPeriodException();
    }

    if (
      true ===
      this.DoesLeaveRequestLackPostponedWorkedFreeDays.isSatisfiedBy(
        startDate,
        endDate
      )
    ) {
      comment += ` ⚠️ Cette demande de congé contient un ou plusieurs jour(s) férié(s) glissant non pris en compte.`;
    }

    const leaveRequest = await this.leaveRequestRepository.save(
      new LeaveRequest(
        user,
        type,
        startDate,
        startsAllDay,
        endDate,
        endsAllDay,
        comment
      )
    );

    return leaveRequest.getId();
  }
}
