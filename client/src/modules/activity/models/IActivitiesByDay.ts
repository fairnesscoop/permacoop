import {IActivity} from './IActivity';

export interface IActivitiesByDay {
  date: string;
  isWeekend: boolean;
  activities: IActivity[];
}
