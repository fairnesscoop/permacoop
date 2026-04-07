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

  it('testQuotaNotExceededWithHalfDay', async () => {
    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([]);

    when(
      dateUtils.getLeaveDuration('2026-04-10', false, '2026-04-10', true)
    ).thenReturn(0.5);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-04-10',
      false,
      '2026-04-10',
      true
    );

    expect(result).toBe(false);
  });

  it('testQuotaNotExceededAt2Days', async () => {
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

    when(
      dateUtils.getLeaveDuration('2026-04-05', true, '2026-04-05', true)
    ).thenReturn(1);

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

    expect(result).toBe(false);
  });

  it('testQuotaExceededWith3Days', async () => {
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

    when(
      dateUtils.getLeaveDuration('2026-04-05', true, '2026-04-05', true)
    ).thenReturn(1);

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

    expect(result).toBe(true);
  });

  it('testQuotaExceededWhenAlready2Days', async () => {
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

    when(
      dateUtils.getLeaveDuration('2026-04-05', true, '2026-04-06', true)
    ).thenReturn(2);

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

    expect(result).toBe(true);
  });

  it('testMultipleMonthsApril', async () => {
    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([]);

    when(
      dateUtils.getLeaveDuration('2026-04-10', true, '2026-04-10', true)
    ).thenReturn(1);

    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        5
      )
    ).thenResolve([]);

    when(
      dateUtils.getLeaveDuration('2026-05-01', true, '2026-05-01', true)
    ).thenReturn(0);

    const result = await specification.isSatisfiedBy(
      instance(user),
      '2026-04-10',
      true,
      '2026-05-01',
      true
    );

    expect(result).toBe(false);
  });

  it('testMultipleMonthsExceeded', async () => {
    const mayLeave = mock(LeaveRequest);
    when(mayLeave.getStartDate()).thenReturn('2026-05-05');
    when(mayLeave.isStartsAllDay()).thenReturn(true);
    when(mayLeave.getEndDate()).thenReturn('2026-05-06');
    when(mayLeave.isEndsAllDay()).thenReturn(true);

    when(
      leaveRequestRepository.findMenstrualLeaveRequestsByUserAndMonth(
        'user-123',
        2026,
        4
      )
    ).thenResolve([]);

    when(
      dateUtils.getLeaveDuration('2026-04-10', true, '2026-04-10', true)
    ).thenReturn(0);

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

    expect(result).toBe(true);
  });
});
