import { IQuery } from 'src/Application/IQuery';

export class GetMonthlyFairCalendarQuery implements IQuery {
  constructor(public readonly date: Date, public readonly userId: string) {}
}
