import { User } from '../../User/User.entity';
import { ILeaveRequestOwnership } from '../LeaveRequest.entity';

export class DoesLeaveRequestBelongToUser {
  public isSatisfiedBy(
    leaveRequest: ILeaveRequestOwnership,
    user: User
  ): boolean {
    return leaveRequest.getUserId() === user.getId();
  }
}
