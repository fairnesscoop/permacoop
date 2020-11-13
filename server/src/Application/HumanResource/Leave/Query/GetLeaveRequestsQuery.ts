import { IQuery } from 'src/Application/IQuery';

export class GetLeaveRequestsQuery implements IQuery {
  constructor(public readonly page: number) {}
}
