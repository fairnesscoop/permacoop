import { mock, instance } from 'ts-mockito';
import { Address } from './Address.entity';
import { Customer } from './Customer.entity';

describe('Customer.entity', () => {
  it('testGetters', () => {
    const address = mock(Address);
    const customer = new Customer('Radio France', instance(address));

    expect(customer.getId()).toBe(undefined);
    expect(customer.getAddress()).toBe(instance(address));
    expect(customer.getName()).toBe('Radio France');
  });

  it('testUpdate', () => {
    const address = mock(Address);
    const customer = new Customer('Radio France', instance(address));
    customer.updateName('RF');

    expect(customer.getId()).toBe(undefined);
    expect(customer.getAddress()).toBe(instance(address));
    expect(customer.getName()).toBe('RF');
  });
});
