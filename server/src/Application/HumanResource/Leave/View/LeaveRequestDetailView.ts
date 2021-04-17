import { UserSummaryView } from '../../User/View/UserSummaryView';
import {
  Type,
  Status
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class LeaveRequestDetailView {
  constructor(
    public readonly id: string,
    public readonly type: Type,
    public readonly status: Status,
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean,
    public readonly duration: number,
    public readonly comment: string,
    public readonly user: UserSummaryView,
    public readonly moderator: UserSummaryView = null,
    public readonly moderationComment: string = null
  ) {}
}
