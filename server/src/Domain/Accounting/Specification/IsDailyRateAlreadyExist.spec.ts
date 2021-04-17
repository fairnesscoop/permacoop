import { mock, instance, when, verify, anything, anyOfClass } from 'ts-mockito';
import { DailyRate } from 'src/Domain/Accounting/DailyRate.entity';
import { IsDailyRateAlreadyExist } from './IsDailyRateAlreadyExist';
import { DailyRateRepository } from 'src/Infrastructure/Accounting/Repository/DailyRateRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { Task } from 'src/Domain/Task/Task.entity';

describe('IsDailyRateAlreadyExist', () => {
  let dailyRateRepository: DailyRateRepository;
  let isDailyRateAlreadyExist: IsDailyRateAlreadyExist;
  const user = mock(User);
  const customer = mock(Customer);
  const task = mock(Task);

  beforeEach(() => {
    dailyRateRepository = mock(DailyRateRepository);
    isDailyRateAlreadyExist = new IsDailyRateAlreadyExist(
      instance(dailyRateRepository)
    );
  });

  it('testDailyRateAlreadyExist', async () => {
    when(
      dailyRateRepository.findOneByUserCustomerAndTask(
        instance(user),
        instance(customer),
        instance(task)
      )
    ).thenResolve(
      new DailyRate(1000, instance(user), instance(customer), instance(task))
    );
    expect(
      await isDailyRateAlreadyExist.isSatisfiedBy(
        instance(user),
        instance(task),
        instance(customer)
      )
    ).toBe(true);
    verify(
      dailyRateRepository.findOneByUserCustomerAndTask(
        instance(user),
        instance(customer),
        instance(task)
      )
    ).once();
  });

  it('testDailyRateDontExist', async () => {
    when(
      dailyRateRepository.findOneByUserCustomerAndTask(
        instance(user),
        instance(customer),
        instance(task)
      )
    ).thenResolve(null);
    expect(
      await isDailyRateAlreadyExist.isSatisfiedBy(
        instance(user),
        instance(task),
        instance(customer)
      )
    ).toBe(false);
    verify(
      dailyRateRepository.findOneByUserCustomerAndTask(
        instance(user),
        instance(customer),
        instance(task)
      )
    ).once();
  });
});
