import {Task} from 'src/Domain/Task/Task.entity';
import {Project} from 'src/Domain/Project/Project.entity';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';

export abstract class AbstractProjectAndTaskGetter {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository
  ) {}

  protected async getTask(taskId?: string): Promise<Task | null> {
    if (!taskId) {
      return null;
    }

    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }

    return task;
  }

  protected async getProject(projectId?: string): Promise<Project | null> {
    if (!projectId) {
      return null;
    }

    const project = await this.projectRepository.findOneById(projectId);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    return project;
  }
}
