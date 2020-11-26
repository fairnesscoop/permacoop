import { mock, instance } from 'ts-mockito';
import { User } from '../HumanResource/User/User.entity';
import { Project } from '../Project/Project.entity';
import { Invoice, InvoiceStatus } from './Invoice.entity';

describe('Invoice.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const project = mock(Project);

    const invoice = new Invoice(
      'FS-2020-0001',
      InvoiceStatus.SENT,
      '2020-11-09',
      instance(user),
      instance(project)
    );

    expect(invoice.getId()).toBe(undefined);
    expect(invoice.getInvoiceId()).toBe('FS-2020-0001');
    expect(invoice.getExpiryDate()).toBe('2020-11-09');
    expect(invoice.getStatus()).toBe(InvoiceStatus.SENT);
    expect(invoice.getCreatedAt()).toBe(undefined);
    expect(invoice.getOwner()).toBe(instance(user));
    expect(invoice.getProject()).toBe(instance(project));
    expect(invoice.getQuote()).toBeUndefined();
    expect(invoice.getItems()).toBeUndefined();
  });
});
