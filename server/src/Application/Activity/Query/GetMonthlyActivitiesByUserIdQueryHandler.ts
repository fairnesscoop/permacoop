import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetMonthlyActivitiesByUserIdQuery} from './GetMonthlyActivitiesByUserIdQuery';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {ActivityView} from '../View/ActivityView';
import {MonthlyActivitiesView} from '../View/MonthlyActivitiesView';
import {IDateUtilsAdapter} from 'src/Application/Adapter/IDateUtilsAdapter';
import {ActivitiesByDayView} from '../View/ActivitiesByDayView';

@QueryHandler(GetMonthlyActivitiesByUserIdQuery)
export class GetMonthlyActivitiesByUserIdQueryHandler {
  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository,
    @Inject('IDateUtilsAdapter')
    private readonly dateUtilsAdapter: IDateUtilsAdapter
  ) {}

  public async execute(
    query: GetMonthlyActivitiesByUserIdQuery
  ): Promise<MonthlyActivitiesView> {
    const {date, userId} = query;
    const activities = await this.activityRepository.findMonthlyActivitiesByUser(
      userId,
      this.dateUtilsAdapter.format(date, 'y-MM-dd')
    );

    const activitiesByDayView = this.initActivitiesForEveryDayOfMonth(date);
    let totalTimeSpent = 0;

    for (const activity of activities) {
      const task = activity.getTask();
      const project = activity.getProject();
      const dayIndex = new Date(activity.getDate()).getDate() - 1;
      totalTimeSpent += activity.getTime();

      activitiesByDayView[dayIndex].activities.push(
        new ActivityView(
          activity.getId(),
          activity.getTime(),
          activity.getSummary(),
          project.getFullName(),
          task.getName()
        )
      );
    }

    return new MonthlyActivitiesView(totalTimeSpent, activitiesByDayView);
  }

  private initActivitiesForEveryDayOfMonth(date: Date): ActivitiesByDayView[] {
    const nbDays = this.dateUtilsAdapter.getDaysInMonth(date);
    const activitiesByDayView: ActivitiesByDayView[] = [];

    for (let day = 0; day <= nbDays - 1; day++) {
      const generatedDate = new Date(date.setDate(day + 1));

      activitiesByDayView[day] = new ActivitiesByDayView(
        this.dateUtilsAdapter.format(generatedDate, 'y-MM-dd'),
        this.dateUtilsAdapter.isWeekend(generatedDate),
        []
      );
    }

    return activitiesByDayView;
  }
}
