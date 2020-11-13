import { UserSummaryView} from '../../User/View/UserSummaryView';
import {
  Type,
  Status
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class LeaveRequestView {
  constructor(
    public readonly id: string,
    public readonly type: Type,
    public readonly status: Status,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly duration: number,
    public readonly user: UserSummaryView
  ) {}
}
