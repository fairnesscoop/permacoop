import {Activity} from './Activity';

export class ActivitiesByDay {
  constructor(
    public readonly date: string,
    public readonly isWeekend: boolean,
    public readonly activities: Activity[] = []
  ) {}
}
