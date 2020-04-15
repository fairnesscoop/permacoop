import {IQuery} from 'src/Application/IQuery';

export class GetMonthlyEventsQuery implements IQuery {
  constructor(public readonly date: Date, public readonly userId: string) {}
}
