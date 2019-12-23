import {Activity} from '../models/Activity';
import {Project} from '../../project/models/Project';
import {Task} from '../../task/models/Task';
import {Customer} from '../../customer/models/Customer';

export class ActivityFactory {
  public static create(payload: any): Activity {
    const {task, project} = payload;

    return new Activity(
      payload.id,
      payload.time,
      payload.summary,
      payload.username,
      new Project(project.id, project.name),
      new Task(task.id, task.name)
    );
  }

  public static createWithCustomer(payload: any): Activity {
    const {task, project} = payload;

    return new Activity(
      payload.id,
      payload.time,
      payload.summary,
      payload.username,
      new Project(
        project.id,
        project.name,
        new Customer(project.customer.id, project.customer.name)
      ),
      new Task(task.id, task.name)
    );
  }
}
