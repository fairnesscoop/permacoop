import {IActivitiesByDay} from './IActivitiesByDay';

export interface IMonthlyActivities {
  totalTimeSpent: number;
  days: IActivitiesByDay[];
}
