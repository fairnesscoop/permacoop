import { IQuery } from 'src/Application/IQuery';

export class GetYearlyLeavesSummaryQuery implements IQuery {
  constructor(
    public readonly currentUserId: string,
    public readonly page: number
  ) {}
}
