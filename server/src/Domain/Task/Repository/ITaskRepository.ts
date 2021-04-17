import { Task } from '../Task.entity';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findOneByName(name: string): Promise<Task | undefined>;
  findOneById(id: string): Promise<Task | undefined>;
  findTasks(page: number): Promise<[Task[], number]>;
}
