import {Activity} from '../models/Activity';
import {Project} from '../../project/models/Project';
import {Task} from '../../task/models/Task';

export class ActivityFactory {
  public static create(payload: any) {
    const {task, project} = payload;

    return new Activity(
      payload.id,
      new Date(payload.date),
      payload.time,
      payload.summary,
      payload.username,
      new Project(project.id, project.name),
      new Task(task.id, task.name)
    );
  }
}
