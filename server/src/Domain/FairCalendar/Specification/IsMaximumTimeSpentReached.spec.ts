import {instance, mock, when, verify} from 'ts-mockito';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {IsMaximumTimeSpentReached} from './IsMaximumTimeSpentReached';
import {Event} from '../Event.entity';
import {User} from 'src/Domain/User/User.entity';

describe('IsMaximumTimeSpentReached', () => {
  let eventRepository: EventRepository;
  let isMaximumTimeSpentReached: IsMaximumTimeSpentReached;

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    isMaximumTimeSpentReached = new IsMaximumTimeSpentReached(
      instance(eventRepository)
    );
  });

  it('testMaximumTimeSpentNotReached', async () => {
    const user = mock(User);
    const event = mock(Event);

    when(event.getUser()).thenReturn(instance(user));
    when(event.getDate()).thenReturn('2019-01-01');
    when(event.getTime()).thenReturn(50);
    when(
      eventRepository.getDayTimeSpentByUser(instance(user), '2019-01-01')
    ).thenResolve(50);

    expect(await isMaximumTimeSpentReached.isSatisfiedBy(instance(event))).toBe(
      false
    );

    verify(event.getUser()).once();
    verify(event.getDate()).once();
    verify(event.getTime()).once();
    verify(
      eventRepository.getDayTimeSpentByUser(instance(user), '2019-01-01')
    ).once();
  });

  it('testMaximumTimeSpentReached', async () => {
    const user = mock(User);
    const event = mock(Event);

    when(event.getUser()).thenReturn(instance(user));
    when(event.getDate()).thenReturn('2019-01-01');
    when(event.getTime()).thenReturn(50);
    when(
      eventRepository.getDayTimeSpentByUser(instance(user), '2019-01-01')
    ).thenResolve(75);

    expect(await isMaximumTimeSpentReached.isSatisfiedBy(instance(event))).toBe(
      true
    );

    verify(event.getUser()).once();
    verify(event.getDate()).once();
    verify(event.getTime()).once();
    verify(
      eventRepository.getDayTimeSpentByUser(instance(user), '2019-01-01')
    ).once();
  });
});
