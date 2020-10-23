import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddEventCommand } from './AddEventCommand';
import { ITaskRepository } from 'src/Domain/Task/Repository/ITaskRepository';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { IEventRepository } from 'src/Domain/FairCalendar/Repository/IEventRepository';
import { IsMaximumTimeSpentReached } from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';
import { Event, EventType } from 'src/Domain/FairCalendar/Event.entity';
import { IDateUtils } from 'src/Application/IDateUtils';
import { ProjectOrTaskMissingException } from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';
import { AbstractProjectAndTaskGetter } from './AbstractProjectAndTaskGetter';
import { NoDateDuringThisPeriodException } from 'src/Domain/FairCalendar/Exception/NoDateDuringThisPeriodException';
import { AddEventsView } from '../View/AddEventsView';

@CommandHandler(AddEventCommand)
export class AddEventCommandHandler extends AbstractProjectAndTaskGetter {
  constructor(
    @Inject('ITaskRepository') taskRepository: ITaskRepository,
    @Inject('IProjectRepository') projectRepository: IProjectRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly isMaximumTimeSpentReached: IsMaximumTimeSpentReached
  ) {
    super(taskRepository, projectRepository);
  }

  public async execute(command: AddEventCommand): Promise<AddEventsView> {
    const {type, startDate, endDate, projectId, taskId, summary, time, user} = command;
    const errors: string[] = [];

    if (type === EventType.MISSION && (!projectId || !taskId)) {
      throw new ProjectOrTaskMissingException();
    }

    const days = this.getDays(startDate, endDate);

    const [project, task] = await Promise.all([
      this.getProject(projectId),
      this.getTask(taskId)
    ]);

    for (const day of days) {
      const date = this.dateUtils.format(day, 'y-MM-dd');
      const event = new Event(
        type,
        user,
        time,
        date,
        project,
        task,
        summary
      );

      if (true === (await this.isMaximumTimeSpentReached.isSatisfiedBy(event))) {
        errors.push(date);

        continue;
      }

      this.eventRepository.save(event);
    }

    return new AddEventsView(errors);
  }

  private getDays(startDate: Date, endDate: Date): Date[] {
    const days = this.dateUtils.getWorkedDaysDuringAPeriod(startDate, endDate);

    if (0 === days.length) {
      throw new NoDateDuringThisPeriodException();
    }

    return days;
  }
}
