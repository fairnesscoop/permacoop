import {Task} from '../Task.entity';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findOneByName(name: string): Promise<Task | undefined>;
  findTasks(): Promise<Task[]>;
}
