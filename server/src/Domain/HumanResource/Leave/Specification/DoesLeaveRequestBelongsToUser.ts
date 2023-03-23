import { User } from '../../User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';

export class DoesLeaveRequestBelongsToUser {
  public isSatisfiedBy(leaveRequest: LeaveRequest, user: User): boolean {
    return leaveRequest.getUser().getId() === user.getId();
  }
}
