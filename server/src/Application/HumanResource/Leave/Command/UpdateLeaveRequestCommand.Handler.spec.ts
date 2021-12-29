import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import {
  LeaveRequest,
  Type
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { UpdateLeaveRequestCommand } from './UpdateLeaveRequestCommand';
import { UpdateLeaveRequestCommandHandler } from './UpdateLeaveRequestCommandHandler';

describe('UpdateLeaveRequestCommandHandler', () => {
  let leaveRequestRepository: ILeaveRequestRepository;
  let user: User;
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
    true
  );

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    user = mock(User);
    commandHandler = new UpdateLeaveRequestCommandHandler(
      instance(leaveRequestRepository)
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
          new LeaveRequest(instance(user), type, startDate, startsAllDay, endDate, endsAllDay)
        )
      )
    ).once();
  });
});
