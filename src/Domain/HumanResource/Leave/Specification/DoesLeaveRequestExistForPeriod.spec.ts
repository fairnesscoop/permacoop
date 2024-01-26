import { mock, instance, when, verify } from 'ts-mockito';
import { DoesLeaveRequestExistForPeriod } from './DoesLeaveRequestExistForPeriod';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { LeaveRequest, Type } from '../LeaveRequest.entity';

describe('DoesLeaveRequestExistForPeriod', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let doesLeaveRequestExistForPeriod: DoesLeaveRequestExistForPeriod;
  const user = mock(User);
  const startDate = '2019-01-04';
  const endDate = '2019-01-06';

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    doesLeaveRequestExistForPeriod = new DoesLeaveRequestExistForPeriod(
      instance(leaveRequestRepository)
    );
  });

  it('testLeaveAlreadyExistForThisPeriod', async () => {
    when(
      leaveRequestRepository.findExistingLeaveRequestsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(
      new LeaveRequest(
        instance(user),
        Type.PAID,
        startDate,
        true,
        endDate,
        true,
        'H&M wedding'
      )
    );
    expect(
      await doesLeaveRequestExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(true);
    verify(
      leaveRequestRepository.findExistingLeaveRequestsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });

  it('testLeaveDoesntExistForThisPeriod', async () => {
    when(
      leaveRequestRepository.findExistingLeaveRequestsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(null);
    expect(
      await doesLeaveRequestExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(false);
    verify(
      leaveRequestRepository.findExistingLeaveRequestsByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });
});
