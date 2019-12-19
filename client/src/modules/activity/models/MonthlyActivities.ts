import {Activity} from './Activity';

export class MonthlyActivities {
  constructor(
    public readonly date: string,
    public readonly isWeekend: boolean,
    public readonly activities: Activity[] = []
  ) {}
}
