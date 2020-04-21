import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {AddEventCommand} from './AddEventCommand';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {IEventRepository} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import {IsMaximumTimeSpentReached} from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';
import {Event, EventType} from 'src/Domain/FairCalendar/Event.entity';
import {MaximumEventReachedException} from 'src/Domain/FairCalendar/Exception/MaximumEventReachedException';
import {IDateUtils} from 'src/Application/IDateUtils';
import {ProjectOrTaskMissingException} from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';
import {AbstractProjectAndTaskGetter} from './AbstractProjectAndTaskGetter';

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

  public async execute(command: AddEventCommand): Promise<string> {
    const {type, date, projectId, taskId, summary, time, user} = command;

    if (type === EventType.MISSION && (!projectId || !taskId)) {
      throw new ProjectOrTaskMissingException();
    }

    const project = await this.getProject(projectId);
    const task = await this.getTask(taskId);
    const event = new Event(
      type,
      user,
      time,
      this.dateUtils.format(date, 'y-MM-dd'),
      project,
      task,
      summary
    );

    if (true === (await this.isMaximumTimeSpentReached.isSatisfiedBy(event))) {
      throw new MaximumEventReachedException();
    }

    const savedEvent = await this.eventRepository.save(event);

    return savedEvent.getId();
  }
}
