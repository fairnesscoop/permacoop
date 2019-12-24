import {ActivityView} from './ActivityView';

export class ActivitiesByDayView {
  constructor(
    public readonly date: string,
    public readonly isWeekend: boolean,
    public readonly activities: ActivityView[] = []
  ) {}
}
