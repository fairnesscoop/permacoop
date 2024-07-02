import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { AcceptLeaveRequestCommandHandler } from './AcceptLeaveRequestCommandHandler';
import { AcceptLeaveRequestCommand } from './AcceptLeaveRequestCommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { LeaveRequestCantBeModeratedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeModeratedException';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { EventBusAdapter } from 'src/Infrastructure/Adapter/EventBusAdapter';
import { AcceptedLeaveRequestEvent } from '../Event/AcceptedLeaveRequestEvent';
import { DoesLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesLeaveExistForPeriod';
import { EventsOrLeavesAlreadyExistForThisPeriodException } from 'src/Domain/FairCalendar/Exception/EventsOrLeavesAlreadyExistForThisPeriodException';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { CommandBusAdapter } from 'src/Infrastructure/Adapter/CommandBusAdapter';
import { FluentTranslatorAdapter } from 'src/Infrastructure/Adapter/FluentTranslatorAdapter';

describe('AcceptLeaveRequestCommandHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let eventBusAdapter: EventBusAdapter;
  let dateUtilsAdapter: DateUtilsAdapter;
  let canLeaveRequestBeModerated: CanLeaveRequestBeModerated;
  let doesLeaveExistForPeriod: DoesLeaveExistForPeriod;
  let commandBusAdapter: CommandBusAdapter;
  let fluentTranslatorAdapter: FluentTranslatorAdapter;
  let handler: AcceptLeaveRequestCommandHandler;

  const user = mock(User);
  const leaveRequest = mock(LeaveRequest);
  const command = new AcceptLeaveRequestCommand(
    instance(user),
    'cfdd06eb-cd71-44b9-82c6-46110b30ce05',
    'Enjoy'
  );

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    eventBusAdapter = mock(EventBusAdapter);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    canLeaveRequestBeModerated = mock(CanLeaveRequestBeModerated);
    doesLeaveExistForPeriod = mock(DoesLeaveExistForPeriod);
    commandBusAdapter = mock(CommandBusAdapter);
    fluentTranslatorAdapter = mock(FluentTranslatorAdapter);

    handler = new AcceptLeaveRequestCommandHandler(
      instance(leaveRequestRepository),
      instance(eventBusAdapter),
      instance(dateUtilsAdapter),
      instance(canLeaveRequestBeModerated),
      instance(doesLeaveExistForPeriod),
      instance(commandBusAdapter),
      instance(fluentTranslatorAdapter)
    );
  });

  it('testLeaveNotNotFound', async () => {
    when(
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(LeaveRequestNotFoundException);
      expect(e.message).toBe(
        'human_resources.leaves.requests.errors.not_found'
      );
      verify(
        leaveRequestRepository.findOneById(
          'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
        )
      ).once();
      verify(
        canLeaveRequestBeModerated.isSatisfiedBy(anything(), anything())
      ).never();
      verify(
        doesLeaveExistForPeriod.isSatisfiedBy(
          anything(),
          anything(),
          anything()
        )
      ).never();
      verify(leaveRequest.accept(anything(), anything(), anything())).never();
      verify(eventBusAdapter.publish(anything())).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testLeaveCantBeModerated', async () => {
    when(
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(leaveRequest));
    when(
      canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(user)
      )
    ).thenReturn(false);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(LeaveRequestCantBeModeratedException);
      expect(e.message).toBe(
        'human_resources.leaves.requests.errors.cant_be_moderated'
      );
      verify(
        canLeaveRequestBeModerated.isSatisfiedBy(
          instance(leaveRequest),
          instance(user)
        )
      ).once();
      verify(
        leaveRequestRepository.findOneById(
          'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
        )
      ).once();
      verify(
        doesLeaveExistForPeriod.isSatisfiedBy(
          anything(),
          anything(),
          anything()
        )
      ).never();
      verify(eventBusAdapter.publish(anything())).never();
      verify(leaveRequest.accept(anything(), anything(), anything())).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testEventsAlreadyExist', async () => {
    when(leaveRequest.getStartDate()).thenReturn('2019-01-04');
    when(leaveRequest.getEndDate()).thenReturn('2019-01-06');
    when(leaveRequest.getUser()).thenReturn(instance(user));

    when(
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(leaveRequest));
    when(
      canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(user)
      )
    ).thenReturn(true);
    when(
      doesLeaveExistForPeriod.isSatisfiedBy(
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
        canLeaveRequestBeModerated.isSatisfiedBy(
          instance(leaveRequest),
          instance(user)
        )
      ).once();
      verify(
        leaveRequestRepository.findOneById(
          'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
        )
      ).once();
      verify(
        doesLeaveExistForPeriod.isSatisfiedBy(
          instance(user),
          '2019-01-04',
          '2019-01-06'
        )
      ).once();
      verify(eventBusAdapter.publish(anything())).never();
      verify(leaveRequest.accept(anything(), anything(), anything())).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testLeaveSuccessfullyAccepted', async () => {
    when(leaveRequest.getId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );
    when(leaveRequest.getStartDate()).thenReturn('2020-09-10');
    when(leaveRequest.getEndDate()).thenReturn('2020-09-15');
    when(leaveRequest.getUser()).thenReturn(instance(user));

    when(
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(leaveRequest));
    when(
      canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(user)
      )
    ).thenReturn(true);
    when(
      doesLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        '2020-09-10',
        '2020-09-15'
      )
    ).thenResolve(false);

    when(dateUtilsAdapter.getCurrentDateToISOString()).thenReturn(
      '2020-09-10T00:00:00.000Z'
    );

    expect(await handler.execute(command)).toBe(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    verify(
      canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(user)
      )
    ).once();
    verify(
      doesLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        '2020-09-10',
        '2020-09-15'
      )
    ).once();
    verify(
      eventBusAdapter.publish(
        deepEqual(new AcceptedLeaveRequestEvent(instance(leaveRequest)))
      )
    ).once();
    verify(
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).once();
    verify(
      leaveRequest.accept(instance(user), '2020-09-10T00:00:00.000Z', 'Enjoy')
    ).once();
    verify(leaveRequestRepository.save(instance(leaveRequest))).once();
  });
});
