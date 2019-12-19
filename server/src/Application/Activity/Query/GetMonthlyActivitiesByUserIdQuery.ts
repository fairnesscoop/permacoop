import {IQuery} from 'src/Application/IQuery';

export class GetMonthlyActivitiesByUserIdQuery implements IQuery {
  constructor(public readonly userId: string, public readonly date: Date) {}
}
