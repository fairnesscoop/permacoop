import { mock, instance } from 'ts-mockito';
import { Address } from '../Customer/Address.entity';
import { Cooperative } from './Cooperative.entity';

describe('Cooperative.entity', () => {
  it('testGetters', () => {
    const address = mock(Address);
    const cooperative = new Cooperative('Fairness', 420, instance(address));

    expect(cooperative.getId()).toBe(undefined);
    expect(cooperative.getAddress()).toBe(instance(address));
    expect(cooperative.getName()).toBe('Fairness');
    expect(cooperative.getDayDuration()).toBe(420);
  });
});
