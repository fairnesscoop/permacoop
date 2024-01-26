import {
  mock,
  instance,
  when,
  verify,
  anything,
  deepEqual,
  anyOfClass
} from 'ts-mockito';
import { TaskRepository } from 'src/Infrastructure/Task/Repository/TaskRepository';
import { ProjectRepository } from 'src/Infrastructure/Project/Repository/ProjectRepository';
import { EventRepository } from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import { IsMaximumTimeSpentReached } from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';
import { AddEventCommandHandler } from './AddEventCommandHandler';
import { AddEventCommand } from './AddEventCommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { ProjectNotFoundException } from 'src/Domain/Project/Exception/ProjectNotFoundException';
import { Project } from 'src/Domain/Project/Project.entity';
import { TaskNotFoundException } from 'src/Domain/Task/Exception/TaskNotFoundException';
import { Task } from 'src/Domain/Task/Task.entity';
import { MaximumEventReachedException } from 'src/Domain/FairCalendar/Exception/MaximumEventReachedException';
import { Event, EventType } from 'src/Domain/FairCalendar/Event.entity';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { ProjectOrTaskMissingException } from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';
import { NoDateDuringThisPeriodException } from 'src/Domain/FairCalendar/Exception/NoDateDuringThisPeriodException';
import { AddEventsView } from '../View/AddEventsView';

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
    420,
    new Date('2020-10-19'),
    new Date('2020-10-20'),
    '50e624ef-3609-4053-a437-f74844a2d2de',
    'e3fc9666-2932-4dc1-b2b9-d904388293fb',
    'RF development'
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
          420,
          new Date('2020-10-19'),
          new Date('2020-10-20')
        )
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectOrTaskMissingException);
      expect(e.message).toBe('faircalendar.errors.project_or_task_missing');
      verify(
        dateUtils.getWorkedDaysDuringAPeriod(anything(), anything())
      ).never();
      verify(projectRepository.findOneById(anything())).never();
      verify(projectRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testEmptyDates', async () => {
    const command2 = new AddEventCommand(
      EventType.MISSION,
      instance(user),
      420,
      new Date('2020-10-24'),
      new Date('2020-10-25'),
      '50e624ef-3609-4053-a437-f74844a2d2de',
      'e3fc9666-2932-4dc1-b2b9-d904388293fb',
      'RF development'
    );

    when(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-10-24')),
        deepEqual(new Date('2020-10-25'))
      )
    ).thenReturn([]);

    try {
      await handler.execute(command2);
    } catch (e) {
      expect(e).toBeInstanceOf(NoDateDuringThisPeriodException);
      expect(e.message).toBe('faircalendar.errors.no_date_during_this_period');
      verify(
        dateUtils.getWorkedDaysDuringAPeriod(
          deepEqual(new Date('2020-10-24')),
          deepEqual(new Date('2020-10-25'))
        )
      ).once();
      verify(projectRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testProjectNotFound', async () => {
    when(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-10-19')),
        deepEqual(new Date('2020-10-20'))
      )
    ).thenReturn([new Date('2020-10-19'), new Date('2020-10-20')]);
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
      expect(e.message).toBe('crm.projects.errors.not_found');
      verify(
        dateUtils.getWorkedDaysDuringAPeriod(
          deepEqual(new Date('2020-10-19')),
          deepEqual(new Date('2020-10-20'))
        )
      ).once();
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
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-10-19')),
        deepEqual(new Date('2020-10-20'))
      )
    ).thenReturn([new Date('2020-10-19'), new Date('2020-10-20')]);
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
      expect(e.message).toBe('accounting.tasks.errors.not_found');
      verify(
        dateUtils.getWorkedDaysDuringAPeriod(
          deepEqual(new Date('2020-10-19')),
          deepEqual(new Date('2020-10-20'))
        )
      ).once();
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

  it('testAddOneMaximumTimeSpentReached', async () => {
    const command3 = new AddEventCommand(
      EventType.MISSION,
      instance(user),
      420,
      new Date('2020-10-19'),
      new Date('2020-10-19'),
      '50e624ef-3609-4053-a437-f74844a2d2de',
      'e3fc9666-2932-4dc1-b2b9-d904388293fb',
      'RF development'
    );

    const event1 = new Event(
      EventType.MISSION,
      instance(user),
      420,
      '2020-10-19',
      instance(project),
      instance(task),
      'RF development'
    );

    when(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-10-19')),
        deepEqual(new Date('2020-10-19'))
      )
    ).thenReturn([new Date('2020-10-19')]);
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(
      isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event1))
    ).thenResolve(true);
    when(
      dateUtils.format(deepEqual(new Date('2020-10-19')), 'y-MM-dd')
    ).thenReturn('2020-10-19');

    try {
      await handler.execute(command3);
    } catch (e) {
      expect(e).toBeInstanceOf(MaximumEventReachedException);
      expect(e.message).toBe('faircalendar.errors.event_maximum_reached');
      verify(
        dateUtils.getWorkedDaysDuringAPeriod(
          deepEqual(new Date('2020-10-19')),
          deepEqual(new Date('2020-10-19'))
        )
      ).once();
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anyOfClass(Event))).once();
      verify(
        dateUtils.format(deepEqual(new Date('2020-10-19')), 'y-MM-dd')
      ).once();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testAddWithOneMaximumTimeSpentReached', async () => {
    const event1 = new Event(
      EventType.MISSION,
      instance(user),
      420,
      '2020-10-19',
      instance(project),
      instance(task),
      'RF development'
    );
    const event2 = new Event(
      EventType.MISSION,
      instance(user),
      420,
      '2020-10-20',
      instance(project),
      instance(task),
      'RF development'
    );

    when(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-10-19')),
        deepEqual(new Date('2020-10-20'))
      )
    ).thenReturn([new Date('2020-10-19'), new Date('2020-10-20')]);
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));

    when(
      isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event1))
    ).thenResolve(true);
    when(
      isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(event2))
    ).thenResolve(false);
    when(
      dateUtils.format(deepEqual(new Date('2020-10-19')), 'y-MM-dd')
    ).thenReturn('2020-10-19');
    when(
      dateUtils.format(deepEqual(new Date('2020-10-20')), 'y-MM-dd')
    ).thenReturn('2020-10-20');

    expect(await handler.execute(command)).toMatchObject(
      new AddEventsView(['2020-10-19'])
    );

    verify(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-10-19')),
        deepEqual(new Date('2020-10-20'))
      )
    ).once();
    verify(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).once();
    verify(isMaximumTimeSpentReached.isSatisfiedBy(anyOfClass(Event))).twice();
    verify(
      dateUtils.format(deepEqual(new Date('2020-10-19')), 'y-MM-dd')
    ).once();
    verify(
      dateUtils.format(deepEqual(new Date('2020-10-20')), 'y-MM-dd')
    ).once();
    verify(eventRepository.save(deepEqual(event2))).once();
    verify(eventRepository.save(deepEqual(event1))).never();
  });
});
