import {IQuery} from 'src/Application/IQuery';

export class GetMonthlyActivitiesQuery implements IQuery {
  constructor(
    public readonly date: Date,
    public readonly userId: string,
    public readonly projectId?: string
  ) {}
}
