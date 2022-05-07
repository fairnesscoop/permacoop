import { LeaveRequestSlotView } from '../../Leave/View/LeaveRequestSlotView';

export class UserLeavesView {
  constructor(
    public readonly totalDays: number,
    public readonly leaves: LeaveRequestSlotView[]
  ) {}
}
