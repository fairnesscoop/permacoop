import {ActivityView} from './ActivityView';

export class MonthlyActivitiesView {
  constructor(
    public readonly date: string,
    public readonly isWeekend: boolean,
    public readonly activities: ActivityView[] = []
  ) {}
}
