export class LeaveView {
  constructor(public readonly startDate: Date, public readonly endDate: Date) {}
}

export class PayrollElementsView {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly executivePosition: boolean,
    public readonly joiningDate: Date,
    public readonly leavingDate: Date | null,
    public readonly annualEarnings: number,
    public readonly monthlyEarnings: number,
    public readonly workingTime: string,
    public readonly transportFee: number,
    public readonly mealTickets: number,
    public readonly healthInsurance: boolean,
    public readonly totalPaidLeaves: number,
    public readonly totalUnpaidLeaves: number,
    public readonly totalMedicalLeaves: number,
    public readonly totalSpecialLeaves: number,
    public readonly leaves: LeaveView[]
  ) {}
}
