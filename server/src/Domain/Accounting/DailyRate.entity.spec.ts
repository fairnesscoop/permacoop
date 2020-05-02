import {mock, instance} from 'ts-mockito';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';
import {User} from '../HumanResource/User/User.entity';
import {Customer} from '../Customer/Customer.entity';
import {Task} from '../Task/Task.entity';

describe('DailyRate.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const customer = mock(Customer);
    const task = mock(Task);
    const dailyRate = new DailyRate(
      600,
      instance(user),
      instance(customer),
      instance(task)
    );

    expect(dailyRate.getId()).toBe(undefined);
    expect(dailyRate.getAmount()).toBe(600);
    expect(dailyRate.getUser()).toBe(instance(user));
    expect(dailyRate.getCustomer()).toBe(instance(customer));
    expect(dailyRate.getTask()).toBe(instance(task));
  });

  it('testUpdate', () => {
    const user = mock(User);
    const user2 = mock(User);
    const customer = mock(Customer);
    const customer2 = mock(Customer);
    const task = mock(Task);
    const task2 = mock(Task);

    const dailyRate = new DailyRate(
      600,
      instance(user),
      instance(customer),
      instance(task)
    );

    dailyRate.update(
      650.5,
      instance(user2),
      instance(customer2),
      instance(task2)
    );

    expect(dailyRate.getId()).toBe(undefined);
    expect(dailyRate.getAmount()).toBe(650.5);
    expect(dailyRate.getUser()).toBe(instance(user2));
    expect(dailyRate.getCustomer()).toBe(instance(customer2));
    expect(dailyRate.getTask()).toBe(instance(task2));
  });
});
