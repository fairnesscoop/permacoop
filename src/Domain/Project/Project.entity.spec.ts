import { mock, instance, when } from 'ts-mockito';
import { InvoiceUnits, Project } from './Project.entity';
import { Customer } from '../Customer/Customer.entity';

describe('Project.entity', () => {
  it('testGetters', () => {
    const customer = mock(Customer);
    when(customer.getName()).thenReturn('Radio France');

    const project = new Project(
      'Project name',
      InvoiceUnits.DAY,
      instance(customer)
    );

    expect(project.getId()).toBe(undefined);
    expect(project.getFullName()).toBe('[Radio France] Project name');
    expect(project.getName()).toBe('Project name');
    expect(project.getInvoiceUnit()).toBe(InvoiceUnits.DAY);
    expect(project.getCustomer()).toBe(instance(customer));
  });

  it('testUpdate', () => {
    const customer = mock(Customer);
    const customer2 = mock(Customer);
    when(customer.getName()).thenReturn('Radio France');
    when(customer2.getName()).thenReturn('RF');

    const project = new Project(
      'Project name',
      InvoiceUnits.DAY,
      instance(customer)
    );
    project.update(instance(customer2), InvoiceUnits.HOUR, 'project');

    expect(project.getId()).toBe(undefined);
    expect(project.getFullName()).toBe('[RF] project');
    expect(project.getName()).toBe('project');
    expect(project.getInvoiceUnit()).toBe(InvoiceUnits.HOUR);
    expect(project.getCustomer()).toBe(instance(customer2));
  });
});
