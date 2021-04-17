import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { DoesLeaveRequestExistForPeriod } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestExistForPeriod';
import { CreateLeaveRequestCommandHandler } from './CreateLeaveRequestCommandHandler';
import { CreateLeaveRequestCommand } from './CreateLeaveRequestCommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import {
  Type,
  LeaveRequest
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { LeaveRequestAlreadyExistForThisPeriodException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestAlreadyExistForThisPeriodException';
import { DoesEventsOrLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesEventsOrLeaveExistForPeriod';
import { EventsOrLeavesAlreadyExistForThisPeriodException } from 'src/Domain/FairCalendar/Exception/EventsOrLeavesAlreadyExistForThisPeriodException';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';

describe('CreateLeaveRequestCommandHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let doesLeaveRequestExistForPeriod: DoesLeaveRequestExistForPeriod;
  let doesEventsOrLeaveExistForPeriod: DoesEventsOrLeaveExistForPeriod;
  let handler: CreateLeaveRequestCommandHandler;

  const user = mock(User);
  const command = new CreateLeaveRequestCommand(
    instance(user),
    Type.PAID,
    '2019-01-04',
    true,
    '2019-01-06',
    true,
    'H&M wedding'
  );

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    doesLeaveRequestExistForPeriod = mock(DoesLeaveRequestExistForPeriod);
    doesEventsOrLeaveExistForPeriod = mock(DoesEventsOrLeaveExistForPeriod);

    handler = new CreateLeaveRequestCommandHandler(
      instance(leaveRequestRepository),
      instance(doesLeaveRequestExistForPeriod),
      instance(doesEventsOrLeaveExistForPeriod)
    );
  });

  it('testLeaveAlreadyExist', async () => {
    when(
      doesLeaveRequestExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(LeaveRequestAlreadyExistForThisPeriodException);
      expect(e.message).toBe(
        'human_resources.leaves.requests.errors.already_exist_for_this_period'
      );
      verify(
        doesLeaveRequestExistForPeriod.isSatisfiedBy(
          instance(user),
          '2019-01-04',
          '2019-01-06'
        )
      ).once();
      verify(
        doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
          instance(user),
          '2019-01-04',
          '2019-01-06'
        )
      ).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testEventsAlreadyExist', async () => {
    when(
      doesLeaveRequestExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(false);
    when(
      doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(
        EventsOrLeavesAlreadyExistForThisPeriodException
      );
      expect(e.message).toBe(
        'faircalendar.errors.events_or_leaves_already_exist_for_this_period'
      );
      verify(
        doesLeaveRequestExistForPeriod.isSatisfiedBy(
          instance(user),
          '2019-01-04',
          '2019-01-06'
        )
      ).once();
      verify(
        doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
          instance(user),
          '2019-01-04',
          '2019-01-06'
        )
      ).once();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testCreateLeavesSuccessfully', async () => {
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    when(
      doesLeaveRequestExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(false);
    when(
      doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(false);

    when(
      leaveRequestRepository.save(
        deepEqual(
          new LeaveRequest(
            instance(user),
            Type.PAID,
            '2019-01-04',
            true,
            '2019-01-06',
            true,
            'H&M wedding'
          )
        )
      )
    ).thenResolve(instance(leaveRequest));

    expect(await handler.execute(command)).toBe(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    verify(
      doesLeaveRequestExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).once();
    verify(
      doesEventsOrLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).once();
    verify(
      leaveRequestRepository.save(
        deepEqual(
          new LeaveRequest(
            instance(user),
            Type.PAID,
            '2019-01-04',
            true,
            '2019-01-06',
            true,
            'H&M wedding'
          )
        )
      )
    ).once();
  });
});
