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

  it('testUpdate', () => {
    const customer = mock(Customer);
    const customer2 = mock(Customer);
    when(customer.getName()).thenReturn('Radio France');
    when(customer2.getName()).thenReturn('RF');

    const project = new Project('Project name', instance(customer));
    project.updateCustomerAndName(instance(customer2), 'project');

    expect(project.getFullName()).toBe('[RF] project');
    expect(project.getName()).toBe('project');
    expect(project.getCustomer()).toBe(instance(customer2));
  });
});
