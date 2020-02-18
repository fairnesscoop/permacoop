import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {AddActivityCommand} from './AddActivityCommand';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {IsMaximumTimeSpentReached} from 'src/Domain/Activity/Specification/IsMaximumTimeSpentReached';
import {Activity} from 'src/Domain/Activity/Activity.entity';
import {MaximumActivityReachedException} from 'src/Domain/Activity/Exception/MaximumActivityReachedException';
import {IDateUtils} from 'src/Application/IDateUtils';

@CommandHandler(AddActivityCommand)
export class AddActivityCommandHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly isMaximumTimeSpentReached: IsMaximumTimeSpentReached
  ) {}

  public async execute(command: AddActivityCommand): Promise<string> {
    const {date, projectId, taskId, summary, time, user} = command;

    const project = await this.projectRepository.findOneById(projectId);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }

    const activity = new Activity(
      project,
      task,
      user,
      time,
      this.dateUtils.format(date, 'y-MM-dd'),
      summary
    );

    if (
      true === (await this.isMaximumTimeSpentReached.isSatisfiedBy(activity))
    ) {
      throw new MaximumActivityReachedException();
    }

    const savedActivity = await this.activityRepository.save(activity);

    return savedActivity.getId();
  }
}
