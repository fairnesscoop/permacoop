import { User } from '../User/User.entity';
import { Leave } from './Leave.entity';
import { LeaveRequest } from './LeaveRequest.entity';
import { UserLeavesCollection } from './UserLeavesCollection';

export class LeavesCollection {
  constructor(public readonly leaves: LeaveRequest[]) {}

  getLeavesByUser(user: User): UserLeavesCollection {
    const userLeaves: LeaveRequest[] = this.leaves.filter(
      (leave: LeaveRequest) => leave.getUser().getId() === user.getId()
    );

    return new UserLeavesCollection(userLeaves);
  }
}
