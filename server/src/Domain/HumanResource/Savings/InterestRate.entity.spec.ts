import { InterestRate } from './InterestRate.entity';

describe('InterestRate.entity', () => {
  it('testGetters', () => {
    const interestRate = new InterestRate(100);

    expect(interestRate.getId()).toBe(undefined);
    expect(interestRate.getRate()).toBe(100);
  });
});
