import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetMonthlyActivitiesByUserIdQuery} from './GetMonthlyActivitiesByUserIdQuery';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {ActivityView} from '../View/ActivityView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {MonthlyActivitiesView} from '../View/MonthlyActivitiesView';
import {IDateUtilsAdapter} from 'src/Application/Adapter/IDateUtilsAdapter';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';

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
  ): Promise<MonthlyActivitiesView[]> {
    const monthlyActivitiesView: MonthlyActivitiesView[] = [];
    const activities = await this.activityRepository.findMonthlyActivitiesByUser(
      query.userId,
      this.dateUtilsAdapter.format(query.date, 'y-MM-dd')
    );

    const nbDays = this.dateUtilsAdapter.getDaysInMonth(query.date);

    // Initialization with all the days of the month
    for (let day = 0; day <= nbDays - 1; day++) {
      const date = new Date(query.date.setDate(day + 1));

      monthlyActivitiesView[day] = new MonthlyActivitiesView(
        this.dateUtilsAdapter.format(date, 'y-MM-dd'),
        this.dateUtilsAdapter.isWeekend(date)
      );
    }

    for (const activity of activities) {
      const task = activity.getTask();
      const project = activity.getProject();
      const dayIndex = new Date(activity.getDate()).getDate() - 1;
      const customer = project.getCustomer();

      monthlyActivitiesView[dayIndex].activities.push(
        new ActivityView(
          activity.getId(),
          activity.getTime(),
          activity.getSummary(),
          new ProjectView(
            project.getId(),
            project.getName(),
            new CustomerView(customer.getId(), customer.getName())
          ),
          new TaskView(task.getId(), task.getName())
        )
      );
    }

    return monthlyActivitiesView;
  }
}
