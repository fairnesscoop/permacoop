import {UserSummaryView} from '../../User/View/UserSummaryView';
import {
  HolidayLeaveType,
  HolidayStatus
} from 'src/Domain/HumanResource/Holiday/Holiday.entity';

export class HolidayView {
  constructor(
    public readonly id: string,
    public readonly leaveType: HolidayLeaveType,
    public readonly status: HolidayStatus,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly duration: number,
    public readonly user: UserSummaryView
  ) {}
}
