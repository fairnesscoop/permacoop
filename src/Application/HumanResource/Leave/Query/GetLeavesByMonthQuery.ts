import { IQuery } from 'src/Application/IQuery';

export class GetLeavesByMonthQuery implements IQuery {
  constructor(public readonly date: Date) {}
}
