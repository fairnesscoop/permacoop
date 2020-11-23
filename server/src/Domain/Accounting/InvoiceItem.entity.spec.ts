import { mock, instance } from 'ts-mockito';
import { InvoiceItem } from './InvoiceItem.entity';
import { Invoice } from './Invoice.entity';

describe('InvoiceItem.entity', () => {
  it('testGetters', () => {
    const billing = mock(Invoice);
    const billingitem = new InvoiceItem(
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
    expect(billingitem.getInvoice()).toBe(instance(billing));
  });
});
