import {ProjectView} from './ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

export class ActivityView {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly time: number,
    public readonly summary: string,
    public readonly username: string,
    public readonly project: ProjectView,
    public readonly task: TaskView
  ) {}
}
