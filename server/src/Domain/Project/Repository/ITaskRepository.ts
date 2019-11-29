import {Task} from '../Task.entity';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
}
