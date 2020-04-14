import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetMonthlyActivitiesQuery} from './GetMonthlyActivitiesQuery';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {ActivityView} from '../View/ActivityView';
import {MonthlyActivitiesView} from '../View/MonthlyActivitiesView';
import {IDateUtils} from 'src/Application/IDateUtils';
import {ActivitiesByDayView} from '../View/ActivitiesByDayView';

@QueryHandler(GetMonthlyActivitiesQuery)
export class GetMonthlyActivitiesQueryHandler {
  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute(
    query: GetMonthlyActivitiesQuery
  ): Promise<MonthlyActivitiesView> {
    const {date, userId, projectId} = query;
    let totalTimeSpent = 0;

    const activities = await this.activityRepository.findMonthlyActivities(
      this.dateUtils.format(date, 'y-MM-dd'),
      userId,
      projectId
    );
    const activitiesByDayView = this.initActivitiesForEveryDayOfMonth(date);

    for (const activity of activities) {
      const task = activity.getTask();
      const project = activity.getProject();
      const dayIndex = new Date(activity.getDate()).getDate() - 1;
      totalTimeSpent += activity.getTime();

      activitiesByDayView[dayIndex].activities.push(
        new ActivityView(
          activity.getId(),
          activity.getTime() / 100,
          activity.getSummary(),
          project.getFullName(),
          task.getName()
        )
      );
    }

    return new MonthlyActivitiesView(totalTimeSpent / 100, activitiesByDayView);
  }

  private initActivitiesForEveryDayOfMonth(date: Date): ActivitiesByDayView[] {
    const nbDays = this.dateUtils.getDaysInMonth(date);
    const activitiesByDayView: ActivitiesByDayView[] = [];

    for (let day = 0; day <= nbDays - 1; day++) {
      const generatedDate = new Date(date.setDate(day + 1));

      activitiesByDayView[day] = new ActivitiesByDayView(
        this.dateUtils.format(generatedDate, 'y-MM-dd'),
        this.dateUtils.isWeekend(generatedDate),
        []
      );
    }

    return activitiesByDayView;
  }
}
