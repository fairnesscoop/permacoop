import { mock, instance, when, verify } from 'ts-mockito';
import { DoesLeaveExistForPeriod } from './DoesLeaveExistForPeriod';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';

describe('DoesLeaveExistForPeriod', () => {
  let leaveRepository: LeaveRepository;
  let doesLeaveExistForPeriod: DoesLeaveExistForPeriod;
  const user = mock(User);
  const startDate = '2019-01-04';
  const endDate = '2019-01-06';

  beforeEach(() => {
    leaveRepository = mock(LeaveRepository);
    doesLeaveExistForPeriod = new DoesLeaveExistForPeriod(
      instance(leaveRepository)
    );
  });

  it('testLeaveAlreadyExistForThisPeriod', async () => {
    when(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(1);
    expect(
      await doesLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(true);
    verify(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });

  it('testLeaveDoesntExistForThisPeriod', async () => {
    when(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(0);
    expect(
      await doesLeaveExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(false);
    verify(
      leaveRepository.countLeavesByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });
});
