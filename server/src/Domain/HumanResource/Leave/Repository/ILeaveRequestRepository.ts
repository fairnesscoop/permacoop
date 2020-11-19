import { LeaveRequest } from '../LeaveRequest.entity';
import { User } from '../../User/User.entity';

export interface ILeaveRequestRepository {
  save(leaveRequest: LeaveRequest): Promise<LeaveRequest>;
  findOneById(id: string): Promise<LeaveRequest | undefined>;
  findLeaveRequests(page: number): Promise<[LeaveRequest[], number]>;
  findExistingLeaveRequestsByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<LeaveRequest | undefined>;
}
