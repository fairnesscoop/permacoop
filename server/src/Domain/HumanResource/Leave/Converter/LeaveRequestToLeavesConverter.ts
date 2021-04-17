import { Inject } from '@nestjs/common';
import { LeaveRequest } from '../LeaveRequest.entity';
import { IDateUtils } from 'src/Application/IDateUtils';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';
import { ICooperativeRepository } from 'src/Domain/Settings/Repository/ICooperativeRepository';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';

export class LeaveRequestToLeavesConverter {
  constructor(
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository,
    @Inject('ICooperativeRepository')
    private readonly cooperativeRepository: ICooperativeRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async convert(leaveRequest: LeaveRequest): Promise<void> {
    const leaves: Leave[] = [];
    const dates = this.dateUtils.getWorkedDaysDuringAPeriod(
      new Date(leaveRequest.getStartDate()),
      new Date(leaveRequest.getEndDate())
    );

    if (!dates || 0 === dates.length) {
      return;
    }

    const cooperative = await this.cooperativeRepository.find();
    if (!cooperative) {
      throw new CooperativeNotFoundException();
    }

    const dayDuration = cooperative.getDayDuration();
    const firstDate = dates[0].toISOString();
    const lastDate = dates[dates.length - 1].toISOString();

    for (const date of dates) {
      leaves.push(
        new Leave(
          leaveRequest,
          this.getTime(
            leaveRequest,
            dayDuration,
            firstDate,
            lastDate,
            date.toISOString()
          ),
          date.toISOString()
        )
      );
    }

    await this.leaveRepository.save(leaves);
  }

  private getTime(
    leaveRequest: LeaveRequest,
    dayDuration: number,
    firstDate: string,
    lastDate: string,
    currentDate: string
  ): number {
    return (firstDate === currentDate &&
      false === leaveRequest.isStartsAllDay()) ||
      (lastDate === currentDate && false === leaveRequest.isEndsAllDay())
      ? dayDuration / 2
      : dayDuration;
  }
}
