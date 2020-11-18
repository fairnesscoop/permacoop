import { mock, instance } from 'ts-mockito';
import { BillingItem } from './BillingItem.entity';
import { Billing } from './Billing.entity';

describe('BillingItem.entity', () => {
  it('testGetters', () => {
    const billing = mock(Billing);
    const billingitem = new BillingItem(
      instance(billing),
      'Développement web',
      18,
      72000,
      0
    );

    expect(billingitem.getId()).toBe(undefined);
    expect(billingitem.getAmount()).toBe(72000);
    expect(billingitem.getDiscount()).toBe(0);
    expect(billingitem.getQuantity()).toBe(18);
    expect(billingitem.getTitle()).toBe('Développement web');
    expect(billingitem.getBilling()).toBe(instance(billing));
  });
});
