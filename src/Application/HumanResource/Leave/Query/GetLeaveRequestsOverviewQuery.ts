import { IQuery } from 'src/Application/IQuery';

export class GetLeaveRequestsOverviewQuery implements IQuery {
  constructor(public readonly date: Date, public readonly userId: string) {}
}
