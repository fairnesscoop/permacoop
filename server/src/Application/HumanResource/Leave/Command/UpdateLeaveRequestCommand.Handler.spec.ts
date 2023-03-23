import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import {
  LeaveRequest,
  Type
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { DoesLeaveRequestBelongsToUser } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestBelongsToUser';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { UpdateLeaveRequestCommand } from './UpdateLeaveRequestCommand';
import { UpdateLeaveRequestCommandHandler } from './UpdateLeaveRequestCommandHandler';
import { LeaveRequestCantBeUpdatedException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestCantBeUpdatedException';

describe('UpdateLeaveRequestCommandHandler', () => {
  let leaveRequestRepository: ILeaveRequestRepository;
  let doesLeaveRequestBelongsToUser: DoesLeaveRequestBelongsToUser;
  const user = mock(User);
  let commandHandler: UpdateLeaveRequestCommandHandler;

  const id = 'fakeId';
  const type = Type.MEDICAL;
  const startDate = '2022-01-05';
  const endDate = '2022-01-05';

  const command = new UpdateLeaveRequestCommand(
    id,
    type,
    startDate,
    true,
    endDate,
    true,
    instance(user)
  );

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    doesLeaveRequestBelongsToUser = mock(DoesLeaveRequestBelongsToUser);

    commandHandler = new UpdateLeaveRequestCommandHandler(
      instance(leaveRequestRepository),
      instance(doesLeaveRequestBelongsToUser)
    );
  });

  it('testLeaveRequestNotFound', async () => {
    when(leaveRequestRepository.findOneById(id)).thenResolve(null);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(LeaveRequestNotFoundException);

      verify(leaveRequestRepository.findOneById(anything())).once();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testLeaveRequestCantBeUpdated', async () => {
    const leaveRequest = new LeaveRequest(
      instance(user),
      Type.PAID,
      startDate,
      false,
      endDate,
      false
    );

    when(leaveRequestRepository.findOneById(id)).thenResolve(leaveRequest);
    when(
      doesLeaveRequestBelongsToUser.isSatisfiedBy(
        instance(leaveRequest),
        instance(user)
      )
    ).thenReturn(false);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(LeaveRequestCantBeUpdatedException);
      expect(e.message).toBe(
        'human_resources.leaves.requests.errors.cant_be_updated'
      );
      verify(
        leaveRequestRepository.findOneById(
          'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
        )
      ).once();
      verify(
        doesLeaveRequestBelongsToUser.isSatisfiedBy(anything(), anything())
      ).never();
      verify(leaveRequestRepository.save(anything())).never();
    }
  });

  it('testLeaveRequestUpdated', async () => {
    const startsAllDay = true;
    const endsAllDay = true;

    const leaveRequest = new LeaveRequest(
      instance(user),
      Type.PAID,
      startDate,
      false,
      endDate,
      false
    );

    when(leaveRequestRepository.findOneById(id)).thenResolve(leaveRequest);

    await commandHandler.execute(command);

    verify(
      leaveRequestRepository.save(
        deepEqual(
          new LeaveRequest(
            instance(user),
            type,
            startDate,
            startsAllDay,
            endDate,
            endsAllDay
          )
        )
      )
    ).once();
  });
});
