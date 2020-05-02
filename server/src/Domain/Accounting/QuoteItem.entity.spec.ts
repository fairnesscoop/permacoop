import {mock, instance} from 'ts-mockito';
import {QuoteItem} from './QuoteItem.entity';
import {Quote} from './Quote.entity';

describe('QuoteItem.entity', () => {
  it('testGetters', () => {
    const quote = mock(Quote);

    const quoteItem = new QuoteItem(
      'Développement mobile',
      120,
      650,
      instance(quote)
    );

    expect(quoteItem.getTitle()).toBe('Développement mobile');
    expect(quoteItem.getQuantity()).toBe(120);
    expect(quoteItem.getDailyRate()).toBe(650);
    expect(quoteItem.getAmountExcludingVat()).toBe(78000);
  });
});
