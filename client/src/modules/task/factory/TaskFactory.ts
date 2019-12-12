import {Task} from '../models/Task';

export class TaskFactory {
  public static create(payload: any): Task {
    return new Task(payload.id, payload.name);
  }
}
