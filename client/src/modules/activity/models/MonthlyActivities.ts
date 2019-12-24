import {ActivitiesByDay} from './ActivitiesByDay';

export class MonthlyActivities {
  constructor(
    public readonly totalTimeSpent: number = 0,
    public readonly days: ActivitiesByDay[] = []
  ) {}
}
