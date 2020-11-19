import {Inject} from '@nestjs/common';
import { User } from '../../User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';
import { ILeaveRequestRepository } from '../Repository/ILeaveRequestRepository';

export class DoesLeaveRequestExistForPeriod {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository
  ) {}

  public async isSatisfiedBy(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    return (
      (await this.leaveRequestRepository.findExistingLeaveRequestsByUserAndPeriod(
        user,
        startDate,
        endDate
      )) instanceof LeaveRequest
    );
  }
}
