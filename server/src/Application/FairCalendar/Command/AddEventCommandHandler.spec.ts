import {
  mock,
  instance,
  when,
  verify,
  anything,
  deepEqual,
  anyOfClass
} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {IsMaximumTimeSpentReached} from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';
import {AddEventCommandHandler} from './AddEventCommandHandler';
import {AddEventCommand} from './AddEventCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';
import {Project} from 'src/Domain/Project/Project.entity';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {Task} from 'src/Domain/Task/Task.entity';
import {MaximumEventReachedException} from 'src/Domain/FairCalendar/Exception/MaximumEventReachedException';
import {Event, EventType} from 'src/Domain/FairCalendar/Event.entity';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {ProjectOrTaskMissingException} from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';

describe('AddEventCommandHandler', () => {
  let taskRepository: TaskRepository;
  let projectRepository: ProjectRepository;
  let eventRepository: EventRepository;
  let isMaximumTimeSpentReached: IsMaximumTimeSpentReached;
  let dateUtils: DateUtilsAdapter;
  let handler: AddEventCommandHandler;

  const user = mock(User);
  const project = mock(Project);
  const task = mock(Task);

  const command = new AddEventCommand(
    EventType.MISSION,
    instance(user),
    100,
    new Date('2019-12-12'),
    '50e624ef-3609-4053-a437-f74844a2d2de',
    'e3fc9666-2932-4dc1-b2b9-d904388293fb',
    'Superkaiser development'
  );

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    projectRepository = mock(ProjectRepository);
    eventRepository = mock(EventRepository);
    taskRepository = mock(TaskRepository);
    isMaximumTimeSpentReached = mock(IsMaximumTimeSpentReached);
    dateUtils = mock(DateUtilsAdapter);

    handler = new AddEventCommandHandler(
      instance(taskRepository),
      instance(projectRepository),
      instance(eventRepository),
      instance(dateUtils),
      instance(isMaximumTimeSpentReached)
    );
  });

  it('testProjectOrTaskMissing', async () => {
    try {
      await handler.execute(
        new AddEventCommand(
          EventType.MISSION,
          instance(user),
          100,
          new Date('2019-12-12')
        )
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectOrTaskMissingException);
      expect(e.message).toBe('fair_calendar.errors.project_or_task_missing');
      verify(projectRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testProjectNotFound', async () => {
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(null);
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('project.errors.not_found');
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testTaskNotFound', async () => {
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskNotFoundException);
      expect(e.message).toBe('task.errors.not_found');
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testMaximumTimeSpentReached', async () => {
    const event = new Event(
      EventType.MISSION,
      instance(user),
      100,
      '2019-12-12',
      instance(project),
      instance(task),
      'Superkaiser development'
    );

    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event))).thenResolve(
      true
    );
    when(dateUtils.format(anyOfClass(Date), 'y-MM-dd')).thenReturn(
      '2019-12-12'
    );

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(MaximumEventReachedException);
      expect(e.message).toBe('fair_calendar.errors.event_maximum_reached');
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event))).once();
      verify(dateUtils.format(anyOfClass(Date), 'y-MM-dd')).once();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testMissionAddedSuccessfully', async () => {
    const event = new Event(
      EventType.MISSION,
      instance(user),
      100,
      '2019-12-12',
      instance(project),
      instance(task),
      'Superkaiser development'
    );
    const savedEvent = mock(Event);

    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event))).thenResolve(
      false
    );
    when(dateUtils.format(anyOfClass(Date), 'y-MM-dd')).thenReturn(
      '2019-12-12'
    );
    when(savedEvent.getId()).thenReturn('a2eaac9c-a118-4502-bc9f-4dbd3b296e73');
    when(eventRepository.save(deepEqual(event))).thenResolve(
      instance(savedEvent)
    );

    expect(await handler.execute(command)).toBe(
      'a2eaac9c-a118-4502-bc9f-4dbd3b296e73'
    );

    verify(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).once();
    verify(dateUtils.format(anyOfClass(Date), 'y-MM-dd')).once();
    verify(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event))).once();
    verify(eventRepository.save(deepEqual(event))).once();
    verify(savedEvent.getId()).once();
  });

  it('testHollidayAddedSuccessfully', async () => {
    const event = new Event(
      EventType.HOLIDAY,
      instance(user),
      100,
      '2019-12-12',
      null,
      null
    );
    const savedEvent = mock(Event);

    when(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event))).thenResolve(
      false
    );
    when(dateUtils.format(anyOfClass(Date), 'y-MM-dd')).thenReturn(
      '2019-12-12'
    );
    when(savedEvent.getId()).thenReturn('a2eaac9c-a118-4502-bc9f-4dbd3b296e73');
    when(eventRepository.save(deepEqual(event))).thenResolve(
      instance(savedEvent)
    );

    expect(
      await handler.execute(
        new AddEventCommand(
          EventType.HOLIDAY,
          instance(user),
          100,
          new Date('2019-12-12')
        )
      )
    ).toBe('a2eaac9c-a118-4502-bc9f-4dbd3b296e73');

    verify(projectRepository.findOneById(anything())).never();
    verify(taskRepository.findOneById(anything())).never();
    verify(dateUtils.format(anyOfClass(Date), 'y-MM-dd')).once();
    verify(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event))).once();
    verify(eventRepository.save(deepEqual(event))).once();
    verify(savedEvent.getId()).once();
  });
});
