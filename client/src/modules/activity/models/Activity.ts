import {Project} from '../../project/models/Project';
import {Task} from '../../task/models/Task';

export class Activity {
  constructor(
    public readonly id: string,
    public readonly time: number,
    public readonly summary: string,
    public readonly username: string,
    public readonly project: Project,
    public readonly task: Task
  ) {}
}
