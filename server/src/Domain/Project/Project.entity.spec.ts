import {mock, instance, when} from 'ts-mockito';
import {Project} from './Project.entity';
import {Customer} from '../Customer/Customer.entity';

describe('Project.entity', () => {
  it('testGetters', () => {
    const customer = mock(Customer);
    when(customer.getName()).thenReturn('Radio France');

    const project = new Project('Project name', 420, instance(customer));

    expect(project.getId()).toBe(undefined);
    expect(project.getFullName()).toBe('[Radio France] Project name');
    expect(project.getName()).toBe('Project name');
    expect(project.getDayDuration()).toBe(420);
    expect(project.getCustomer()).toBe(instance(customer));
  });

  it('testUpdate', () => {
    const customer = mock(Customer);
    const customer2 = mock(Customer);
    when(customer.getName()).thenReturn('Radio France');
    when(customer2.getName()).thenReturn('RF');

    const project = new Project('Project name', 420, instance(customer));
    project.update(instance(customer2), 450, 'project');

    expect(project.getId()).toBe(undefined);
    expect(project.getFullName()).toBe('[RF] project');
    expect(project.getName()).toBe('project');
    expect(project.getDayDuration()).toBe(450);
    expect(project.getCustomer()).toBe(instance(customer2));
  });
});
