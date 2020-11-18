import {mock, instance, when, verify, anything, deepEqual} from 'ts-mockito';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {DeleteEventCommandHandler} from './DeleteEventCommandHandler';
import {DeleteEventCommand} from './DeleteEventCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Event, EventType} from 'src/Domain/FairCalendar/Event.entity';
import {EventNotFoundException} from 'src/Domain/FairCalendar/Exception/EventNotFoundException';
import {EventDoesntBelongToUserException} from 'src/Domain/FairCalendar/Exception/EventDoesntBelongToUserException';
import {Project} from 'src/Domain/Project/Project.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {DoesEventBelongToUser} from 'src/Domain/FairCalendar/Specification/DoesEventBelongToUser';

describe('DeleteEventCommandHandler', () => {
  let eventRepository: EventRepository;
  let doesEventBelongToUser: DoesEventBelongToUser;
  let handler: DeleteEventCommandHandler;

  const user = mock(User);
  const project = mock(Project);
  const task = mock(Task);
  const event = new Event(
    EventType.MISSION,
    instance(user),
    420,
    '2020-05-15',
    true,
    instance(project),
    instance(task),
    'summary'
  );

  const command = new DeleteEventCommand(
    '50e624ef-3609-4053-a437-f74844a2d2de',
    instance(user)
  );

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    doesEventBelongToUser = mock(DoesEventBelongToUser);
    handler = new DeleteEventCommandHandler(
      instance(eventRepository),
      instance(doesEventBelongToUser)
    );
  });

  it('testEventNotFound', async () => {
    when(
      eventRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EventNotFoundException);
      expect(e.message).toBe('faircalendar.errors.event_not_found');
      verify(
        eventRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        doesEventBelongToUser.isSatisfiedBy(anything(), anything())
      ).never();
      verify(eventRepository.delete(anything())).never();
    }
  });

  it('testNotEventOwner', async () => {
    when(
      eventRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(event);
    when(doesEventBelongToUser.isSatisfiedBy(event, instance(user))).thenReturn(
      false
    );

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EventDoesntBelongToUserException);
      expect(e.message).toBe(
        'faircalendar.errors.event_doesnt_belong_to_user'
      );
      verify(
        eventRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(doesEventBelongToUser.isSatisfiedBy(event, instance(user))).once();
      verify(eventRepository.delete(anything())).never();
    }
  });

  it('testDeleteEvent', async () => {
    when(
      eventRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(event);
    when(doesEventBelongToUser.isSatisfiedBy(event, instance(user))).thenReturn(
      true
    );
    when(user.getId()).thenReturn('e3fc9666-2932-4dc1-b2b9-d904388293fb');

    expect(await handler.execute(command));

    verify(
      eventRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(eventRepository.delete(deepEqual(event))).once();
  });
});
