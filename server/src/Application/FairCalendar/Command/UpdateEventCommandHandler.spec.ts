import {mock, instance, when, verify, anything} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {UpdateEventCommandHandler} from './UpdateEventCommandHandler';
import {UpdateEventCommand} from './UpdateEventCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';
import {Project} from 'src/Domain/Project/Project.entity';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {Task} from 'src/Domain/Task/Task.entity';
import {MaximumEventReachedException} from 'src/Domain/FairCalendar/Exception/MaximumEventReachedException';
import {Event, EventType} from 'src/Domain/FairCalendar/Event.entity';
import {ProjectOrTaskMissingException} from 'src/Domain/FairCalendar/Exception/ProjectOrTaskMissingException';
import {DoesEventBelongToUser} from 'src/Domain/FairCalendar/Specification/DoesEventBelongToUser';
import {IsMaximumTimeSpentReachedOnEdition} from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReachedOnEdition';
import {EventNotFoundException} from 'src/Domain/FairCalendar/Exception/EventNotFoundException';
import { EventDoesntBelongToUserException } from 'src/Domain/FairCalendar/Exception/EventDoesntBelongToUserException';

describe('UpdateEventCommandHandler', () => {
  let taskRepository: TaskRepository;
  let projectRepository: ProjectRepository;
  let eventRepository: EventRepository;
  let doesEventBelongToUser: DoesEventBelongToUser;
  let isMaximumTimeSpentReachedOnEdition: IsMaximumTimeSpentReachedOnEdition;
  let handler: UpdateEventCommandHandler;

  const event = mock(Event);
  const user = mock(User);
  const project = mock(Project);
  const task = mock(Task);

  const command = new UpdateEventCommand(
    '5a18fde0-07d9-4854-a6da-c3ad2de76bd7',
    instance(user),
    EventType.MISSION,
    100,
    '50e624ef-3609-4053-a437-f74844a2d2de',
    'e3fc9666-2932-4dc1-b2b9-d904388293fb',
    'Superkaiser development'
  );

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    projectRepository = mock(ProjectRepository);
    eventRepository = mock(EventRepository);
    taskRepository = mock(TaskRepository);
    doesEventBelongToUser = mock(DoesEventBelongToUser);
    isMaximumTimeSpentReachedOnEdition = mock(
      IsMaximumTimeSpentReachedOnEdition
    );

    handler = new UpdateEventCommandHandler(
      instance(taskRepository),
      instance(projectRepository),
      instance(eventRepository),
      instance(doesEventBelongToUser),
      instance(isMaximumTimeSpentReachedOnEdition)
    );
  });

  it('testEventNotFound', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EventNotFoundException);
      expect(e.message).toBe('faircalendar.errors.event_not_found');
      verify(
        eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
      ).once();
      verify(
        doesEventBelongToUser.isSatisfiedBy(anything(), anything())
      ).never();
      verify(projectRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(
        isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(anything(), anything())
      ).never();
      verify(
        event.update(anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testEventDoesntBelongToUser', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(instance(event));
    when(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).thenReturn(false);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EventDoesntBelongToUserException);
      expect(e.message).toBe('faircalendar.errors.event_doesnt_belong_to_user');
      verify(
        doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
      ).once();
      verify(
        eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
      ).once();
      verify(projectRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(
        isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(anything(), anything())
      ).never();
      verify(
        event.update(anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testProjectOrTaskMissing', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(instance(event));
    when(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).thenReturn(true);

    try {
      await handler.execute(
        new UpdateEventCommand(
          '5a18fde0-07d9-4854-a6da-c3ad2de76bd7',
          instance(user),
          EventType.MISSION,
          100
        )
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectOrTaskMissingException);
      expect(e.message).toBe('faircalendar.errors.project_or_task_missing');
      verify(
        doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
      ).once();
      verify(
        eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
      ).once();
      verify(projectRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(
        isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(anything(), anything())
      ).never();
      verify(
        event.update(anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testProjectNotFound', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(instance(event));
    when(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).thenReturn(true);
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('crm.projects.errors.not_found');
      verify(
        eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
      ).once();
      verify(
        doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
      ).once();
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(
        isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(anything(), anything())
      ).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testTaskNotFound', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(instance(event));
    when(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).thenReturn(true);
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
        eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
      ).once();
      verify(
        doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
      ).once();
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(
        isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(anything(), anything())
      ).never();
      verify(
        event.update(anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testMaximumTimeSpentReached', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(instance(event));
    when(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).thenReturn(true);
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(
      isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(instance(event), 100)
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(MaximumEventReachedException);
      expect(e.message).toBe('faircalendar.errors.event_maximum_reached');
      verify(
        eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
      ).once();
      verify(
        doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
      ).once();
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(
        isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(instance(event), 100)
      ).once();
      verify(eventRepository.save(anything())).never();
      verify(
        event.update(anything(), anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testUpdatedSuccessfully', async () => {
    when(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).thenResolve(instance(event));
    when(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).thenReturn(true);
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(
      isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(instance(event), 100)
    ).thenResolve(false);
    when(event.getId()).thenReturn('a2eaac9c-a118-4502-bc9f-4dbd3b296e73');
    when(eventRepository.save(instance(event))).thenResolve(instance(event));

    expect(await handler.execute(command)).toBe(
      'a2eaac9c-a118-4502-bc9f-4dbd3b296e73'
    );

    verify(
      eventRepository.findOneById('5a18fde0-07d9-4854-a6da-c3ad2de76bd7')
    ).once();
    verify(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(
      doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).once();
    verify(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).once();
    verify(
      isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(instance(event), 100)
    ).once();
    verify(
      event.update(
        EventType.MISSION,
        100,
        instance(project),
        instance(task),
        'Superkaiser development'
      )
    ).calledBefore(eventRepository.save(instance(event)));
    verify(eventRepository.save(instance(event))).once();
    verify(event.getId()).once();
  });
});
