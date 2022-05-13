import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { LeavesCollection } from 'src/Domain/HumanResource/Leave/LeavesCollection';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { instance, mock, verify, when } from 'ts-mockito';
import { GetLeavesByMonthQuery } from './GetLeavesByMonthQuery';
import { GetLeavesByMonthQueryHandler } from './GetLeavesByMonthQueryHandler';

describe('GetLeavesByMonthQueryHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let queryHandler: GetLeavesByMonthQueryHandler;

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    queryHandler = new GetLeavesByMonthQueryHandler(
      instance(leaveRequestRepository)
    );
  });

  it('testGetLeaveRequestByMonth', async () => {
    const date = new Date();
    const leave = mock(LeaveRequest);

    when(
      leaveRequestRepository.findAcceptedLeaveRequestsByMonth(date)
    ).thenResolve([instance(leave)]);

    const expectedResult = new LeavesCollection([instance(leave)]);

    expect(
      await queryHandler.execute(
        new GetLeavesByMonthQuery(date)
      )
    ).toMatchObject(expectedResult);

    verify(
      leaveRequestRepository.findAcceptedLeaveRequestsByMonth(date)
    ).once();
  });
});
