import {mock, instance, when, verify} from 'ts-mockito';
import { DoesEventsOrLeaveExistForPeriod } from './DoesEventsOrLeaveExistForPeriod';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { EventRepository } from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';

describe('DoesEventsOrLeaveExistForPeriod', () => {
  let eventRepository: EventRepository;
  let leaveRepository: LeaveRepository;
  let doesEventsOrLeaveExistForPeriod: DoesEventsOrLeaveExistForPeriod;
  const user = mock(User);
  const startDate = '2019-01-04';
  const endDate = '2019-01-06';

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    leaveRepository = mock(LeaveRepository);
    doesEventsOrLeaveExistForPeriod = new DoesEventsOrLeaveExistForPeriod(
      instance(eventRepository),
      instance(leaveRepository),
    );
  });

  it('testEventAlreadyExistForThisPeriod', async () => {
    when(
      eventRepository.countEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(2);
    when(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(1);
    expect(
      await doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(true);
    verify(
      eventRepository.countEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
    verify(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });

  it('testEventDoesntExistForThisPeriod', async () => {
    when(
      eventRepository.countEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(0);
    when(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(0);
    expect(
      await doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(false);
    verify(
      eventRepository.countEventsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
    verify(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });
});
