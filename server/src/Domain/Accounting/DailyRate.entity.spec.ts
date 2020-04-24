import {mock, instance} from 'ts-mockito';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';
import {User} from '../User/User.entity';
import {Customer} from '../Customer/Customer.entity';
import {Task} from '../Task/Task.entity';

describe('DailyRate.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const customer = mock(Customer);
    const task = mock(Task);
    const dailyRate = new DailyRate(
      10000,
      instance(user),
      instance(customer),
      instance(task)
    );

    expect(dailyRate.getAmount()).toBe(10000);
    expect(dailyRate.getUser()).toBe(instance(user));
    expect(dailyRate.getCustomer()).toBe(instance(customer));
    expect(dailyRate.getTask()).toBe(instance(task));
  });
});
