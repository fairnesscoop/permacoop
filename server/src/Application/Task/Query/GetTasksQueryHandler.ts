import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetTasksQuery } from './GetTasksQuery';
import { ITaskRepository } from 'src/Domain/Task/Repository/ITaskRepository';
import { TaskView } from '../View/TaskView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetTasksQuery)
export class GetTasksQueryHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository
  ) {}

  public async execute(query: GetTasksQuery): Promise<Pagination<TaskView>> {
    const taskViews: TaskView[] = [];
    const [tasks, total] = await this.taskRepository.findTasks(query.page);

    for (const task of tasks) {
      taskViews.push(new TaskView(task.getId(), task.getName()));
    }

    return new Pagination<TaskView>(taskViews, total);
  }
}
