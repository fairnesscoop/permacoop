import { ILeaveRequestModeration, Status } from '../LeaveRequest.entity';
import { User } from '../../User/User.entity';

export class CanLeaveRequestBeModerated {
  public isSatisfiedBy(
    leaveRequest: ILeaveRequestModeration,
    user: User
  ): boolean {
    return (
      leaveRequest.getStatus() === Status.PENDING &&
      leaveRequest.getUserId() !== user.getId()
    );
  }
}
