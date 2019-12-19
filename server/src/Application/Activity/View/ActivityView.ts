import {TaskView} from 'src/Application/Task/View/TaskView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';

export class ActivityView {
  constructor(
    public readonly id: string,
    public readonly time: number,
    public readonly summary: string,
    public readonly project: ProjectView,
    public readonly task: TaskView
  ) {}
}
