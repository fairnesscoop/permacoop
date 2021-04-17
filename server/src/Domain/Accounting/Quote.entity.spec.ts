import { mock, instance } from 'ts-mockito';
import { User } from '../HumanResource/User/User.entity';
import { Customer } from '../Customer/Customer.entity';
import { Quote, QuoteStatus } from './Quote.entity';
import { Project } from '../Project/Project.entity';

describe('Quote.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const customer = mock(Customer);
    const project = mock(Project);

    const quote = new Quote(
      'FS-DEVIS-2020-0001',
      QuoteStatus.ACCEPTED,
      instance(user),
      instance(customer),
      instance(project)
    );

    expect(quote.getId()).toBe(undefined);
    expect(quote.getItems()).toBe(undefined);
    expect(quote.getQuoteId()).toBe('FS-DEVIS-2020-0001');
    expect(quote.getStatus()).toBe(QuoteStatus.ACCEPTED);
    expect(quote.getCreatedAt()).toBe(undefined);
    expect(quote.getOwner()).toBe(instance(user));
    expect(quote.getCustomer()).toBe(instance(customer));
    expect(quote.getProject()).toBe(instance(project));
  });
});
