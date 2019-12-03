import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetTasksQuery} from './GetTasksQuery';
import {ITaskRepository} from 'src/Domain/Project/Repository/ITaskRepository';
import {TaskView} from '../../View/TaskView';

@QueryHandler(GetTasksQuery)
export class GetTasksQueryHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository
  ) {}

  public async execute(query: GetTasksQuery): Promise<TaskView[]> {
    const tasks = await this.taskRepository.findTasks();
    const taskViews: TaskView[] = [];

    for (const task of tasks) {
      taskViews.push(new TaskView(task.getId(), task.getName()));
    }

    return taskViews;
  }
}
