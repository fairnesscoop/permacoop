import { UserSummaryView } from '../../User/View/UserSummaryView';
import {
  Type,
  Status,
  ILeaveRequestModeration,
  ILeaveRequestOwnership
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class LeaveRequestDetailView
  implements ILeaveRequestModeration, ILeaveRequestOwnership {
  constructor(
    public readonly id: string,
    public readonly type: Type,
    public readonly status: Status,
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean,
    public readonly duration: number,
    public readonly canCancel: boolean = false,
    public readonly comment: string,
    public readonly user: UserSummaryView,
    public readonly moderator: UserSummaryView = null,
    public readonly moderateAt: string = null,
    public readonly moderationComment: string = null
  ) {}

  public getStatus(): string {
    return this.status;
  }

  public getUserId(): string {
    return this.user.id;
  }
}
