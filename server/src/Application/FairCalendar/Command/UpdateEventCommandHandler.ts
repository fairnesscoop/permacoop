import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UpdateEventCommand} from './UpdateEventCommand';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {IEventRepository} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import {EventType} from 'src/Domain/FairCalendar/Event.entity';
import {MaximumEventReachedException} from 'src/Domain/FairCalendar/Exception/MaximumEventReachedException';
import {ProjectOrTaskMissingException} from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';
import {EventNotFoundException} from 'src/Domain/FairCalendar/Exception/EventNotFoundException';
import {EventDoesntBelongToUserException} from 'src/Domain/FairCalendar/Exception/EventDoesntBelongToUserException';
import {IsEventBelongToUser} from 'src/Domain/FairCalendar/Specification/IsEventBelongToUser';
import {AbstractProjectAndTaskGetter} from './AbstractProjectAndTaskGetter';
import {IsMaximumTimeSpentReachedOnEdition} from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReachedOnEdition';

@CommandHandler(UpdateEventCommand)
export class UpdateEventCommandHandler extends AbstractProjectAndTaskGetter {
  constructor(
    @Inject('ITaskRepository') taskRepository: ITaskRepository,
    @Inject('IProjectRepository') projectRepository: IProjectRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    private readonly isEventBelongToUser: IsEventBelongToUser,
    private readonly isMaximumTimeSpentReachedOnEdition: IsMaximumTimeSpentReachedOnEdition
  ) {
    super(taskRepository, projectRepository);
  }

  public async execute(command: UpdateEventCommand): Promise<string> {
    const {id, type, projectId, taskId, summary, time, user} = command;

    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new EventNotFoundException();
    }

    if (false === this.isEventBelongToUser.isSatisfiedBy(event, user)) {
      throw new EventDoesntBelongToUserException();
    }

    if (type === EventType.MISSION && (!projectId || !taskId)) {
      throw new ProjectOrTaskMissingException();
    }

    const project = await this.getProject(projectId);
    const task = await this.getTask(taskId);

    if (
      true ===
      (await this.isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(event, time))
    ) {
      throw new MaximumEventReachedException();
    }

    event.update(type, time, project, task, summary);
    await this.eventRepository.save(event);

    return event.getId();
  }
}
