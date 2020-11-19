import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateEventCommand } from './UpdateEventCommand';
import { ITaskRepository } from 'src/Domain/Task/Repository/ITaskRepository';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { IEventRepository } from 'src/Domain/FairCalendar/Repository/IEventRepository';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';
import { MaximumEventReachedException } from 'src/Domain/FairCalendar/Exception/MaximumEventReachedException';
import { ProjectOrTaskMissingException } from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';
import { EventNotFoundException } from 'src/Domain/FairCalendar/Exception/EventNotFoundException';
import { EventDoesntBelongToUserException } from 'src/Domain/FairCalendar/Exception/EventDoesntBelongToUserException';
import { DoesEventBelongToUser } from 'src/Domain/FairCalendar/Specification/DoesEventBelongToUser';
import { AbstractProjectAndTaskGetter } from './AbstractProjectAndTaskGetter';
import { IsMaximumTimeSpentReached } from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';

@CommandHandler(UpdateEventCommand)
export class UpdateEventCommandHandler extends AbstractProjectAndTaskGetter {
  constructor(
    @Inject('ITaskRepository') taskRepository: ITaskRepository,
    @Inject('IProjectRepository') projectRepository: IProjectRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    private readonly doesEventBelongToUser: DoesEventBelongToUser,
    private readonly isMaximumTimeSpentReached: IsMaximumTimeSpentReached
  ) {
    super(taskRepository, projectRepository);
  }

  public async execute(command: UpdateEventCommand): Promise<string> {
    const {id, type, projectId, taskId, summary, time, billable, user} = command;

    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new EventNotFoundException();
    }

    if (false === this.doesEventBelongToUser.isSatisfiedBy(event, user)) {
      throw new EventDoesntBelongToUserException();
    }

    if (type === EventType.MISSION && (!projectId || !taskId)) {
      throw new ProjectOrTaskMissingException();
    }

    const [project, task] = await Promise.all([
      this.getProject(projectId),
      this.getTask(taskId)
    ]);

    if (
      true ===
      (await this.isMaximumTimeSpentReached.isSatisfiedBy(event, time))
    ) {
      throw new MaximumEventReachedException();
    }

    event.update(type, time, billable && EventType.MISSION === type, project, task, summary);
    await this.eventRepository.save(event);

    return event.getId();
  }
}
