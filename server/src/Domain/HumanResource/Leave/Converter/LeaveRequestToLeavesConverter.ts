import { Inject } from '@nestjs/common';
import { LeaveRequest } from '../LeaveRequest.entity';
import { IDateUtils } from 'src/Application/IDateUtils';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';

export class LeaveRequestToLeavesConverter {
  constructor(
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public convert(leaveRequest: LeaveRequest): void {
    const leaves: Leave[] = [];
    const dates = this.dateUtils.getWorkedDaysDuringAPeriod(
      new Date(leaveRequest.getStartDate()),
      new Date(leaveRequest.getEndDate())
    );

    if (!dates || 0 === dates.length) {
      return;
    }

    const firstDate = dates[0].toISOString();
    const lastDate = dates[dates.length - 1].toISOString();

    for (const date of dates) {
      leaves.push(
        new Leave(
          leaveRequest,
          this.getTime(leaveRequest, firstDate, lastDate, date.toISOString()),
          date.toISOString()
        )
      );
    }

    this.leaveRepository.save(leaves);
  }

  private getTime(
    leaveRequest: LeaveRequest,
    firstDate: string,
    lastDate: string,
    currentDate: string
  ): number {
    return (firstDate === currentDate && false === leaveRequest.isStartsAllDay()) ||
      (lastDate === currentDate && false === leaveRequest.isEndsAllDay())
      ? 50
      : 100;
  }
}
