import {IQuery} from 'src/Application/IQuery';

export class GetActivitiesByUserIdAndMonth implements IQuery {
  constructor(public readonly userId: string, public readonly date: Date) {}
}
