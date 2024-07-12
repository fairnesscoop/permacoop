import { mock, instance, when, verify } from 'ts-mockito';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';
import { GetLeaveRequestsOverviewQueryHandler } from './GetLeaveRequestsOverviewQueryHandler';
import { ILeaveRequestsOverview } from 'src/Domain/HumanResource/Leave/ILeaveRequestsOverview';
import { GetLeaveRequestsOverviewQuery } from './GetLeaveRequestsOverviewQuery';

describe('GetLeaveRequestsOverviewQueryHandler', () => {
  let leaveRepository: LeaveRepository;
  let dateUtils: DateUtilsAdapter;
  let queryHandler: GetLeaveRequestsOverviewQueryHandler;

  beforeEach(() => {
    leaveRepository = mock(LeaveRepository);
    dateUtils = mock(DateUtilsAdapter);
    queryHandler = new GetLeaveRequestsOverviewQueryHandler(
      instance(dateUtils),
      instance(leaveRepository)
    );
  });

  it('testGetLeaveRequestsOverview', async () => {
    const expectedResult: ILeaveRequestsOverview = {
      daysPerYear: 35,
      daysRemaining: 29
    };

    const now = new Date('2024-07-05');
    const startDate = new Date('2024-06-01');
    const endDate = new Date('2025-05-31');
    const userId = '06691061-b62f-7499-8000-a65d631224f1';

    when(dateUtils.getLeaveReferencePeriodDays(now)).thenReturn([
      startDate,
      endDate
    ]);
    when(dateUtils.getWorkedDaysPerWeek()).thenReturn(5);
    when(dateUtils.getNumberOfPaidLeaveWeeks()).thenReturn(7);

    when(
      leaveRepository.getSumOfPaidLeaveDurationsBetween(
        startDate,
        endDate,
        userId
      )
    ).thenResolve(6 * 420);

    when(dateUtils.getLeaveDurationAsDays(6 * 420)).thenReturn(6);

    expect(
      await queryHandler.execute(new GetLeaveRequestsOverviewQuery(now, userId))
    ).toMatchObject(expectedResult);
  });
});
