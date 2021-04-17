import { instance, mock, when, verify } from 'ts-mockito';
import { EventRepository } from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import { IsMaximumTimeSpentReached } from './IsMaximumTimeSpentReached';
import { Event } from '../Event.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';

describe('IsMaximumTimeSpentReached', () => {
  let eventRepository: EventRepository;
  let leaveRepository: LeaveRepository;
  let isMaximumTimeSpentReached: IsMaximumTimeSpentReached;

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    leaveRepository = mock(LeaveRepository);
    isMaximumTimeSpentReached = new IsMaximumTimeSpentReached(
      instance(eventRepository),
      instance(leaveRepository)
    );
  });

  it('testMaximumTimeSpentNotReached', async () => {
    const user = mock(User);
    const event = mock(Event);

    when(event.getUser()).thenReturn(instance(user));
    when(event.getDate()).thenReturn('2019-01-01');
    when(event.getTime()).thenReturn(420);
    when(
      eventRepository.sumOfTimeSpentByUserAndDate(instance(user), '2019-01-01')
    ).thenResolve(80);
    when(
      leaveRepository.sumOfDurationLeaveByUserAndDate(
        instance(user),
        '2019-01-01'
      )
    ).thenResolve(90);

    expect(await isMaximumTimeSpentReached.isSatisfiedBy(instance(event))).toBe(
      false
    );

    verify(event.getUser()).once();
    verify(event.getDate()).once();
    verify(event.getTime()).once();
    verify(
      eventRepository.sumOfTimeSpentByUserAndDate(instance(user), '2019-01-01')
    ).once();
  });

  it('testMaximumTimeSpentReached', async () => {
    const user = mock(User);
    const event = mock(Event);

    when(event.getUser()).thenReturn(instance(user));
    when(event.getDate()).thenReturn('2019-01-01');
    when(event.getTime()).thenReturn(690);
    when(
      eventRepository.sumOfTimeSpentByUserAndDate(instance(user), '2019-01-01')
    ).thenResolve(90);
    when(
      leaveRepository.sumOfDurationLeaveByUserAndDate(
        instance(user),
        '2019-01-01'
      )
    ).thenResolve(210);

    expect(await isMaximumTimeSpentReached.isSatisfiedBy(instance(event))).toBe(
      true
    );

    verify(event.getUser()).once();
    verify(event.getDate()).once();
    verify(event.getTime()).once();
    verify(
      eventRepository.sumOfTimeSpentByUserAndDate(instance(user), '2019-01-01')
    ).once();
  });
});
