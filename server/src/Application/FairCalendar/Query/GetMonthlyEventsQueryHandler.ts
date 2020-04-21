import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetMonthlyEventsQuery} from './GetMonthlyEventsQuery';
import {IEventRepository} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import {EventView} from '../View/EventView';
import {IDateUtils} from 'src/Application/IDateUtils';
import {GetEventsOverview} from 'src/Domain/FairCalendar/GetEventsOverview';
import {MonthlyEventsView} from '../View/MonthlyEventsView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

@QueryHandler(GetMonthlyEventsQuery)
export class GetMonthlyEventsQueryHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly getEventsOverview: GetEventsOverview
  ) {}

  public async execute(
    query: GetMonthlyEventsQuery
  ): Promise<MonthlyEventsView> {
    const {date, userId} = query;
    const eventViews: EventView[] = [];
    const events = await this.eventRepository.findMonthlyEvents(
      this.dateUtils.format(date, 'y-MM-dd'),
      userId
    );

    const overview = this.getEventsOverview.index(events);

    for (const event of events) {
      const project = event.getProject();
      const task = event.getTask();

      eventViews.push(
        new EventView(
          event.getId(),
          event.getType(),
          event.getTime() / 100,
          event.getDate(),
          event.getSummary(),
          project ? new ProjectView(project.getId(), project.getName()) : null,
          task ? new TaskView(task.getId(), task.getName()) : null
        )
      );
    }

    return new MonthlyEventsView(eventViews, overview);
  }
}
