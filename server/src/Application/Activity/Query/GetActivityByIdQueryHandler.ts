import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetActivityByIdQuery} from './GetActivityByIdQuery';
import {ActivityView} from '../View/ActivityView';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {ActivityNotFoundException} from 'src/Domain/Activity/Exception/ActivityNotFoundException';
import {ProjectView} from '../../Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

@QueryHandler(GetActivityByIdQuery)
export class GetActivityByIdQueryHandler {
  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository
  ) {}

  public async execute(query: GetActivityByIdQuery): Promise<ActivityView> {
    const activity = await this.activityRepository.findOneById(query.id);
    if (!activity) {
      throw new ActivityNotFoundException();
    }

    const task = activity.getTask();
    const project = activity.getProject();

    return new ActivityView(
      activity.getId(),
      activity.getDate(),
      activity.getTime(),
      activity.getSummary(),
      activity.getUser().getFullName(),
      new ProjectView(project.getId(), project.getName()),
      new TaskView(task.getId(), task.getName())
    );
  }
}
