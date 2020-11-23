import { mock, instance } from 'ts-mockito';
import { User } from '../HumanResource/User/User.entity';
import { Customer } from '../Customer/Customer.entity';
import { Billing, BillingStatus } from './Billing.entity';
import { Quote } from './Quote.entity';

describe('Billing.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const customer = mock(Customer);
    const quote = mock(Quote);

    const billing = new Billing(
      'FS-2020-0001',
      BillingStatus.SENT,
      '2020-11-09',
      instance(user),
      instance(customer),
      instance(quote),
    );

    expect(billing.getId()).toBe(undefined);
    expect(billing.getBillingId()).toBe('FS-2020-0001');
    expect(billing.getExpiryDate()).toBe('2020-11-09');
    expect(billing.getStatus()).toBe(BillingStatus.SENT);
    expect(billing.getCreatedAt()).toBe(undefined);
    expect(billing.getOwner()).toBe(instance(user));
    expect(billing.getCustomer()).toBe(instance(customer));
    expect(billing.getQuote()).toBe(instance(quote));
  });
});
