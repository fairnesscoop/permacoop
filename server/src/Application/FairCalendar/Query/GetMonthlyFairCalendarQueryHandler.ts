import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/Domain/FairCalendar/Repository/IEventRepository';
import { IDateUtils } from 'src/Application/IDateUtils';
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
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute(
    query: GetMonthlyFairCalendarQuery
  ): Promise<FairCalendarView[]> {
    const { date, userId } = query;
    const formatedDate = this.dateUtils.format(date, 'y-MM-dd');

    const [events, leaves] = await Promise.all([
      this.eventRepository.findMonthlyEvents(formatedDate, userId),
      this.leaveRepository.findMonthlyLeaves(formatedDate, userId)
    ]);

    return [
      ...this.buildEvents(events),
      ...this.buildLeaves(leaves),
      ...this.buildWorkedFreeDays(date)
    ];
  }

  private buildEvents(events: Event[]): FairCalendarView[] {
    const result: FairCalendarView[] = [];

    for (const event of events) {
      const project = event.getProject();
      const task = event.getTask();

      result.push(
        new FairCalendarView(
          event.getType(),
          event.getTime(),
          event.getDate(),
          event.getSummary(),
          event.getId(),
          event.isBillable(),
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
        new FairCalendarView(leave.getType(), leave.getTime(), leave.getDate())
      );
    }

    return result;
  }

  private buildWorkedFreeDays(date: Date): FairCalendarView[] {
    const result: FairCalendarView[] = [];

    const workedFreeDays = this.dateUtils.getWorkedFreeDays(date.getFullYear());

    const monthWorkedFreeDays = workedFreeDays.filter(
      d => d.getMonth() === date.getMonth()
    );

    const sevenHoursInMinutesTime = 7 * 60;

    for (const day of monthWorkedFreeDays) {
      result.push(
        new FairCalendarView(
          'holiday',
          sevenHoursInMinutesTime,
          this.dateUtils.format(day, 'yyyy-MM-dd')
        )
      );
    }

    return result;
  }
}
