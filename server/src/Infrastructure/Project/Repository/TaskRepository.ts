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
}
