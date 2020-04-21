import {instance, mock, when, verify} from 'ts-mockito';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {IsMaximumTimeSpentReachedOnEdition} from './IsMaximumTimeSpentReachedOnEdition';
import {Event} from '../Event.entity';
import {User} from 'src/Domain/User/User.entity';

describe('IsMaximumTimeSpentReachedOnEdition', () => {
  let eventRepository: EventRepository;
  let isMaximumTimeSpentReachedOnEdition: IsMaximumTimeSpentReachedOnEdition;

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    isMaximumTimeSpentReachedOnEdition = new IsMaximumTimeSpentReachedOnEdition(
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
    ).thenResolve(100);

    expect(
      await isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(
        instance(event),
        50
      )
    ).toBe(false);

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

    expect(
      await isMaximumTimeSpentReachedOnEdition.isSatisfiedBy(
        instance(event),
        100
      )
    ).toBe(true);

    verify(event.getUser()).once();
    verify(event.getDate()).once();
    verify(event.getTime()).once();
    verify(
      eventRepository.getDayTimeSpentByUser(instance(user), '2019-01-01')
    ).once();
  });
});
