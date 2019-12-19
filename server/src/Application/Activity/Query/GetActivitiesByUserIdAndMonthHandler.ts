import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetActivitiesByUserIdAndMonth} from './GetActivitiesByUserIdAndMonth';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {ActivityView} from '../View/ActivityView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

@QueryHandler(GetActivitiesByUserIdAndMonth)
export class GetActivitiesByUserIdAndMonthHandler {
  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository
  ) {}

  public async execute(
    query: GetActivitiesByUserIdAndMonth
  ): Promise<ActivityView[]> {
    const activityViews: ActivityView[] = [];
    const activities = await this.activityRepository.findByUserIdAndMonth(
      query.userId,
      query.date
    );

    for (const activity of activities) {
      const task = activity.getTask();
      const project = activity.getProject();

      activityViews.push(
        new ActivityView(
          activity.getId(),
          activity.getDate(),
          activity.getTime(),
          activity.getSummary(),
          activity.getUser().getFullName(),
          new ProjectView(project.getId(), project.getName()),
          new TaskView(task.getId(), task.getName())
        )
      );
    }

    return activityViews;
  }
}
