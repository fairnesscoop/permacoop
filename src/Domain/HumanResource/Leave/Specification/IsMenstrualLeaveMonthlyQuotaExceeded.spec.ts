import { mock, instance, when } from 'ts-mockito';
import { IsMenstrualLeaveMonthlyQuotaExceeded } from './IsMenstrualLeaveMonthlyQuotaExceeded';
import { ILeaveRequestRepository } from '../Repository/ILeaveRequestRepository';
import { IDateUtils } from 'src/Application/IDateUtils';
import { User } from '../../User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';

describe('IsMenstrualLeaveMonthlyQuotaExceeded', () => {
  let leaveRequestRepository: ILeaveRequestRepository;
  let dateUtils: IDateUtils;
  let specification: IsMenstrualLeaveMonthlyQuotaExceeded;
  let user: User;

  beforeEach(() => {
    leaveRequestRepository = mock();
    dateUtils = mock();
    specification = new IsMenstrualLeaveMonthlyQuotaExceeded(
      instance(leaveRequestRepository),
      instance(dateUtils)
    );
    user = mock(User);
    when(user.getId()).thenReturn('user-123');
  });

  it('testQuotaNotExceededWhenNoExistingRequests', async () => {
    // No existing menstrual leave requests
    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([]);

    // New request is 1 day (under quota of 2)
    when(
      dateUtils.getLeaveDuration('2026-04-10', true, '2026-04-10', true)
    ).thenReturn(1);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-04-10',
      true,
      '2026-04-10',
      true
    );

    expect(result).toBe(false); // Not exceeded
  });

  it('testQuotaNotExceededAt2Days', async () => {
    // 1 existing day of menstrual leave
    const existingLeave = mock(LeaveRequest);
    when(existingLeave.getStartDate()).thenReturn('2026-04-05');
    when(existingLeave.isStartsAllDay()).thenReturn(true);
    when(existingLeave.getEndDate()).thenReturn('2026-04-05');
    when(existingLeave.isEndsAllDay()).thenReturn(true);

    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([instance(existingLeave)]);

    // Existing request is 1 day
    when(
      dateUtils.getLeaveDuration('2026-04-05', true, '2026-04-05', true)
    ).thenReturn(1);

    // New request is 1 day (total = 2, exactly at quota)
    when(
      dateUtils.getLeaveDuration('2026-04-10', true, '2026-04-10', true)
    ).thenReturn(1);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-04-10',
      true,
      '2026-04-10',
      true
    );

    expect(result).toBe(false); // Not exceeded (2 = quota)
  });

  it('testQuotaExceededWhenAddingMoreThan2Days', async () => {
    // 1 existing day of menstrual leave
    const existingLeave = mock(LeaveRequest);
    when(existingLeave.getStartDate()).thenReturn('2026-04-05');
    when(existingLeave.isStartsAllDay()).thenReturn(true);
    when(existingLeave.getEndDate()).thenReturn('2026-04-05');
    when(existingLeave.isEndsAllDay()).thenReturn(true);

    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([instance(existingLeave)]);

    // Existing request is 1 day
    when(
      dateUtils.getLeaveDuration('2026-04-05', true, '2026-04-05', true)
    ).thenReturn(1);

    // New request is 2 days (total = 3, exceeds quota of 2)
    when(
      dateUtils.getLeaveDuration('2026-04-10', true, '2026-04-11', true)
    ).thenReturn(2);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-04-10',
      true,
      '2026-04-11',
      true
    );

    expect(result).toBe(true); // Exceeded
  });

  it('testQuotaExceededWhenAlready2Days', async () => {
    // 2 existing days of menstrual leave
    const existingLeave = mock(LeaveRequest);
    when(existingLeave.getStartDate()).thenReturn('2026-04-05');
    when(existingLeave.isStartsAllDay()).thenReturn(true);
    when(existingLeave.getEndDate()).thenReturn('2026-04-06');
    when(existingLeave.isEndsAllDay()).thenReturn(true);

    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([instance(existingLeave)]);

    // Existing request is 2 days
    when(
      dateUtils.getLeaveDuration('2026-04-05', true, '2026-04-06', true)
    ).thenReturn(2);

    // New request is 1 day (total = 3, exceeds quota of 2)
    when(
      dateUtils.getLeaveDuration('2026-04-10', true, '2026-04-10', true)
    ).thenReturn(1);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-04-10',
      true,
      '2026-04-10',
      true
    );

    expect(result).toBe(true); // Exceeded
  });

  it('testQuotaChecksMultipleMonths', async () => {
    // Request spans April and May
    // Mock April having 1 existing day
    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([]);

    when(
      dateUtils.getLeaveDuration('2026-04-01', true, '2026-04-01', true)
    ).thenReturn(0);

    // Mock May having 2 existing days (at quota)
    const mayLeave = mock(LeaveRequest);
    when(mayLeave.getStartDate()).thenReturn('2026-05-05');
    when(mayLeave.isStartsAllDay()).thenReturn(true);
    when(mayLeave.getEndDate()).thenReturn('2026-05-06');
    when(mayLeave.isEndsAllDay()).thenReturn(true);

    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        5
      )
    ).thenResolve([instance(mayLeave)]);

    when(
      dateUtils.getLeaveDuration('2026-05-05', true, '2026-05-06', true)
    ).thenReturn(2);

    // New request is 1 day in May (total May = 3, exceeds quota)
    when(
      dateUtils.getLeaveDuration('2026-05-10', true, '2026-05-10', true)
    ).thenReturn(1);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-05-10',
      true,
      '2026-05-10',
      true
    );

    expect(result).toBe(true); // Exceeded for May
  });
});
