import { Status } from '../LeaveRequest.entity';
import { User } from '../../User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';

export class CanLeaveRequestBeModerated {
  public isSatisfiedBy(leaveRequest: LeaveRequest, user: User): boolean {
    return (
      leaveRequest.getStatus() === Status.PENDING &&
      leaveRequest.getUser().getId() !== user.getId()
    );
  }
}
