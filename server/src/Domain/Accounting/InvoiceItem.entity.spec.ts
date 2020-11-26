import { mock, instance } from 'ts-mockito';
import { InvoiceItem } from './InvoiceItem.entity';
import { Invoice } from './Invoice.entity';

describe('InvoiceItem.entity', () => {
  it('testGetters', () => {
    const invoice = mock(Invoice);
    const invoiceitem = new InvoiceItem(
      instance(invoice),
      'Développement web',
      420,
      72000,
      0
    );

    expect(invoiceitem.getId()).toBe(undefined);
    expect(invoiceitem.getAmount()).toBe(72000);
    expect(invoiceitem.getDiscount()).toBe(0);
    expect(invoiceitem.getTimeSpent()).toBe(420);
    expect(invoiceitem.getTitle()).toBe('Développement web');
    expect(invoiceitem.getInvoice()).toBe(instance(invoice));
  });
});
