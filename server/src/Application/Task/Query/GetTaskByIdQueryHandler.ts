import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { ITaskRepository } from 'src/Domain/Task/Repository/ITaskRepository';
import { TaskView } from '../View/TaskView';
import { GetTaskByIdQuery } from './GetTaskByIdQuery';
import { TaskNotFoundException } from 'src/Domain/Task/Exception/TaskNotFoundException';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdQueryHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository
  ) {}

  public async execute(query: GetTaskByIdQuery): Promise<TaskView> {
    const task = await this.taskRepository.findOneById(query.id);
    if (!task) {
      throw new TaskNotFoundException();
    }

    return new TaskView(task.getId(), task.getName());
  }
}
