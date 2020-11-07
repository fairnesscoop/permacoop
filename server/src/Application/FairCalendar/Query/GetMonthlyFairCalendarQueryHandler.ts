import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/Domain/FairCalendar/Repository/IEventRepository';
import { IDateUtils } from 'src/Application/IDateUtils';
import { GetFairCalendarOverview } from 'src/Domain/FairCalendar/GetFairCalendarOverview';
import { MonthlyEventsView } from '../View/MonthlyEventsView';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';
import { FairCalendarView } from '../View/FairCalendarView';
import { GetMonthlyFairCalendarQuery } from './GetMonthlyFairCalendarQuery';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { Event } from 'src/Domain/FairCalendar/Event.entity';

@QueryHandler(GetMonthlyFairCalendarQuery)
export class GetMonthlyFairCalendarQueryHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly getFairCalendarOverview: GetFairCalendarOverview
  ) {}

  public async execute(
    query: GetMonthlyFairCalendarQuery
  ): Promise<MonthlyEventsView> {
    const { date, userId } = query;
    const formatedDate = this.dateUtils.format(date, 'y-MM-dd');

    const [ events, leaves ] = await Promise.all([
      this.eventRepository.findMonthlyEvents(formatedDate, userId),
      this.leaveRepository.findMonthlyLeaves(formatedDate, userId)
    ]);

    return new MonthlyEventsView(
      [...this.buildEvents(events), ...this.buildLeaves(leaves)],
      this.getFairCalendarOverview.index([...events, ...leaves])
    );
  }

  private buildEvents(events: Event[]): FairCalendarView[] {
    const result: FairCalendarView[] = [];

    for (const event of events) {
      const project = event.getProject();
      const task = event.getTask();

      result.push(
        new FairCalendarView(
          event.getType(),
          event.getTime() / 100,
          event.getDate(),
          event.getId(),
          event.getSummary(),
          project ? new ProjectView(project.getId(), project.getName()) : null,
          task ? new TaskView(task.getId(), task.getName()) : null
        )
      );
    }

    return result;
  }

  private buildLeaves(leaves: Leave[]): FairCalendarView[] {
    const result: FairCalendarView[] = [];

    for (const leave of leaves) {
      result.push(
        new FairCalendarView(
          leave.getType(),
          leave.getTime() / 100,
          leave.getDate()
        )
      );
    }

    return result;
  }
}
