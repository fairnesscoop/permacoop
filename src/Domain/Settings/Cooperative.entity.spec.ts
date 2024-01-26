import { mock, instance } from 'ts-mockito';
import { Cooperative } from './Cooperative.entity';

describe('Cooperative.entity', () => {
  it('testGetters', () => {
    const cooperative = new Cooperative('Fairness', 420);

    expect(cooperative.getId()).toBe(undefined);
    expect(cooperative.getName()).toBe('Fairness');
    expect(cooperative.getDayDuration()).toBe(420);
  });
});
