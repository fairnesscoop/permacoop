import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetEventByIdQuery} from './GetEventByIdQuery';
import {IEventRepository} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import {EventView} from '../View/EventView';
import {EventNotFoundException} from 'src/Domain/FairCalendar/Exception/EventNotFoundException';
<<<<<<< HEAD
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';
=======
import {EventType} from 'src/Domain/FairCalendar/Event.entity';
>>>>>>> [fair_calendar][event] Get, lis, create & delete events

@QueryHandler(GetEventByIdQuery)
export class GetEventByIdQueryHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async execute(query: GetEventByIdQuery): Promise<EventView> {
    const event = await this.eventRepository.findOneById(query.id);
    if (!event) {
      throw new EventNotFoundException();
    }

    const project = event.getProject();
    const task = event.getTask();

<<<<<<< HEAD
    return new EventView(
      event.getId(),
      event.getType(),
      event.getTime() / 100,
      event.getDate(),
      event.getSummary(),
      project ? new ProjectView(project.getId(), project.getName()) : null,
      task ? new TaskView(task.getId(), task.getName()) : null
=======
    let title = event.getType();
    if (EventType.MISSION && project && task) {
      title = `[${task.getName()}] ${project.getName()}`;
    }

    return new EventView(
      event.getId(),
      title,
      event.getType(),
      event.getTime() / 100,
      event.getDate(),
      event.getSummary()
>>>>>>> [fair_calendar][event] Get, lis, create & delete events
    );
  }
}
