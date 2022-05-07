import { UserLeavesView } from './UserLeavesView';

export class UserElementsView {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly contract: string,
    public readonly isExecutivePosition: boolean,
    public readonly joiningDate: string,
    public readonly annualEarnings: number,
    public readonly monthlyEarnings: number,
    public readonly workingTime: string,
    public readonly transportFee: number,
    public readonly mealTickets: number,
    public readonly healthInsurance: string,
    public readonly paidLeaves: UserLeavesView,
    public readonly unpaidLeaves: UserLeavesView,
    public readonly sickLeaves: UserLeavesView,
    public readonly exceptionalLeaves: UserLeavesView
  ) {}
}
