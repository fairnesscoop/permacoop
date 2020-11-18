import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { TaskView } from 'src/Application/Task/View/TaskView';

export class FairCalendarView {
  constructor(
    public readonly type: string,
    public readonly time: number,
    public readonly date: string,
    public readonly id?: string,
    public readonly billable?: boolean,
    public readonly project?: ProjectView,
    public readonly task?: TaskView
  ) {}
}
