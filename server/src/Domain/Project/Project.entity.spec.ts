import {mock, instance, when} from 'ts-mockito';
import {Project} from './Project.entity';
import {Customer} from '../Customer/Customer.entity';

describe('Project.entity', () => {
  it('testGetters', () => {
    const customer = mock(Customer);
    when(customer.getName()).thenReturn('Radio France');

    const project = new Project('Project name', instance(customer));

    expect(project.getFullName()).toBe('[Radio France] Project name');
    expect(project.getName()).toBe('Project name');
    expect(project.getCustomer()).toBe(instance(customer));
  });
});
