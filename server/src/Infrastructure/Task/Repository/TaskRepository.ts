import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {Task} from 'src/Domain/Task/Task.entity';
import {MAX_ITEMS_PER_PAGE} from 'src/Application/Common/Pagination';

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

  public findTasks(page: number = 1): Promise<[Task[], number]> {
    return this.repository
      .createQueryBuilder('task')
      .select(['task.id', 'task.name'])
      .orderBy('task.name', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
