import {mock, instance, when, verify} from 'ts-mockito';
import {DoesEventsExistForPeriod} from './DoesEventsExistForPeriod';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';

describe('DoesEventsExistForPeriod', () => {
  let eventRepository: EventRepository;
  let doesEventsExistForPeriod: DoesEventsExistForPeriod;
  const user = mock(User);
  const startDate = '2019-01-04';
  const endDate = '2019-01-06';

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    doesEventsExistForPeriod = new DoesEventsExistForPeriod(
      instance(eventRepository)
    );
  });

  it('testEventAlreadyExistForThisPeriod', async () => {
    when(
      eventRepository.countExistingEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(2);
    expect(
      await doesEventsExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(true);
    verify(
      eventRepository.countExistingEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });

  it('testEventDoesntExistForThisPeriod', async () => {
    when(
      eventRepository.countExistingEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(0);
    expect(
      await doesEventsExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(false);
    verify(
      eventRepository.countExistingEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });
});
