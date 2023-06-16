import { mock, instance, when, verify } from 'ts-mockito';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { GetPendingLeaveRequestsCountQuery } from './GetPendingLeaveRequestsCountQuery';
import { GetPendingLeaveRequestsCountQueryHandler } from './GetPendingLeaveRequestsCountQueryHandler';

describe('GetPendingLeaveRequestsCountQueryHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let queryHandler: GetPendingLeaveRequestsCountQueryHandler;

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    queryHandler = new GetPendingLeaveRequestsCountQueryHandler(
      instance(leaveRequestRepository)
    );
  });

  it('testGetPendingCount', async () => {
    when(leaveRequestRepository.getPendingCount()).thenResolve(3);

    expect(
      await queryHandler.execute(new GetPendingLeaveRequestsCountQuery())
    ).toBe(3);

    verify(leaveRequestRepository.getPendingCount()).once();
  });
});
