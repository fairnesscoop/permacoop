import { ILeaveRequestCancellation } from '../LeaveRequest.entity';
import { User } from '../../User/User.entity';
import { Inject } from '@nestjs/common';
import { IDateUtils } from 'src/Application/IDateUtils';

export class CanLeaveRequestBeCancelled {
  constructor(
    @Inject('IDateUtils')
    private dateUtils: IDateUtils
  ) {}

  public isSatisfiedBy(
    byUser: User,
    leaveRequest: ILeaveRequestCancellation
  ): boolean {
    if (byUser.getId() !== leaveRequest.getUserId()) {
      return false;
    }

    if (
      new Date(leaveRequest.getStartDate()) < this.dateUtils.getCurrentDate()
    ) {
      return false;
    }

    return true;
  }
}
