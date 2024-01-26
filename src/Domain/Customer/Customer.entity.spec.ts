import { mock, instance } from 'ts-mockito';
import { Customer } from './Customer.entity';

describe('Customer.entity', () => {
  it('testGetters', () => {
    const customer = new Customer('Radio France');

    expect(customer.getId()).toBe(undefined);
    expect(customer.getName()).toBe('Radio France');
  });

  it('testUpdate', () => {
    const customer = new Customer('Radio France');
    customer.updateName('RF');

    expect(customer.getId()).toBe(undefined);
    expect(customer.getName()).toBe('RF');
  });
});
