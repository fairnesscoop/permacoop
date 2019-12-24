import {ActivitiesByDayView} from './ActivitiesByDayView';

export class MonthlyActivitiesView {
  constructor(
    public readonly totalTimeSpent: number = 0,
    public readonly days: ActivitiesByDayView[] = []
  ) {}
}
