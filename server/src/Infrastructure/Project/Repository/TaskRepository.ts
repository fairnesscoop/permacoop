import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ITaskRepository} from 'src/Domain/Project/Repository/ITaskRepository';
import {Task} from 'src/Domain/Project/Task.entity';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  public save(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  public findOneByName(name: string): Promise<Task | undefined> {
    return this.repository
      .createQueryBuilder('task')
      .where('LOWER(task.name) = LOWER(:name)', {name})
      .getOne();
  }

  public findOneById(id: string): Promise<Task | undefined> {
    return this.repository
      .createQueryBuilder('task')
      .where('task.id = :id', {id})
      .getOne();
  }

  public findTasks(): Promise<Task[]> {
    return this.repository
      .createQueryBuilder('task')
      .select(['task.id', 'task.name'])
      .orderBy('task.name', 'ASC')
      .getMany();
  }
}
