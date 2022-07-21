import { IQuery } from 'src/Application/IQuery';

export class GetMealTicketsPerMonthQuery implements IQuery {
  constructor(public readonly date: Date) {}
}
