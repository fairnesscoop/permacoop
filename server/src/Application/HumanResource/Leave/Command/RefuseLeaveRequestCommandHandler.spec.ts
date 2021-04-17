import { mock, instance, when, verify, anything } from 'ts-mockito';
import { RefuseLeaveRequestCommandHandler } from './RefuseLeaveRequestCommandHandler';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { RefuseLeaveRequestCommand } from './RefuseLeaveRequestCommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import { LeaveRequestCantBeModeratedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeModeratedException';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';

describe('RefuseLeaveRequestCommandHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let dateUtilsAdapter: DateUtilsAdapter;
  let canLeaveRequestBeModerated: CanLeaveRequestBeModerated;
  let handler: RefuseLeaveRequestCommandHandler;

  const user = mock(User);
  const leaveRequest = mock(LeaveRequest);
  const command = new RefuseLeaveRequestCommand(
    instance(user),
    'cfdd06eb-cd71-44b9-82c6-46110b30ce05',
    'Bad period'
  );

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    canLeaveRequestBeModerated = mock(CanLeaveRequestBeModerated);

    handler = new RefuseLeaveRequestCommandHandler(
      instance(leaveRequestRepository),
      instance(dateUtilsAdapter),
      instance(canLeaveRequestBeModerated)
    );
  });

  it('testLeaveRequestNotNotFound', async () => {
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
      verify(leaveRequest.refuse(anything(), anything(), anything())).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testLeaveRequestCantBeRefused', async () => {
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
      verify(leaveRequest.refuse(anything(), anything(), anything())).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testLeaveRequestSuccessfullyRefused', async () => {
    when(
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(leaveRequest));
    when(leaveRequest.getId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );
    when(
      canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(user)
      )
    ).thenReturn(true);
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
      leaveRequestRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).once();
    verify(
      leaveRequest.refuse(
        instance(user),
        '2020-09-10T00:00:00.000Z',
        'Bad period'
      )
    ).calledBefore(leaveRequestRepository.save(instance(leaveRequest)));
    verify(leaveRequestRepository.save(instance(leaveRequest))).once();
  });
});
