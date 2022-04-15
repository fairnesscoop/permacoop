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
      public readonly paidLeaves: number,
      public readonly unpaidLeaves: number,
      public readonly sickLeaves: number,
      public readonly exceptionalLeaves: number
    ) {}
  }
