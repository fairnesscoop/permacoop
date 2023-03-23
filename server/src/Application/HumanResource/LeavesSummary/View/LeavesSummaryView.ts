// import { UserSummaryView } from '../../User/View/UserSummaryView';
// import {
//   Type,
//   Status
// } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class LeavesSummaryView {
  constructor(
    public readonly totalTime: number,
    public readonly timeRemaing: number,
    public readonly firstName: string,
    public readonly lastName: string
  ) {}
}
