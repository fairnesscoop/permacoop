import { mock, instance, when, verify } from 'ts-mockito';
import { ProjectRepository } from 'src/Infrastructure/Project/Repository/ProjectRepository';
import { InvoiceUnits, Project } from 'src/Domain/Project/Project.entity';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { GetProjectByIdQueryHandler } from './GetProjectByIdQueryHandler';
import { GetProjectByIdQuery } from './GetProjectByIdQuery';
import { ProjectNotFoundException } from 'src/Domain/Project/Exception/ProjectNotFoundException';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { Customer } from 'src/Domain/Customer/Customer.entity';

describe('GetProjectByIdQueryHandler', () => {
  const query = new GetProjectByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetProject', async () => {
    const projectRepository = mock(ProjectRepository);
    const queryHandler = new GetProjectByIdQueryHandler(
      instance(projectRepository)
    );

    const project = mock(Project);
    const customer = mock(Customer);
    when(customer.getId()).thenReturn('aeb50974-0dcd-4ef4-af43-d656250e43bc');
    when(customer.getName()).thenReturn('Customer');

    when(project.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(project.getName()).thenReturn('Project');
    when(project.isActive()).thenReturn(true);
    when(project.getInvoiceUnit()).thenReturn(InvoiceUnits.DAY);
    when(project.getCustomer()).thenReturn(instance(customer));
    when(
      projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(project));

    expect(await queryHandler.execute(query)).toMatchObject(
      new ProjectView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        'Project',
        true,
        InvoiceUnits.DAY,
        new CustomerView('aeb50974-0dcd-4ef4-af43-d656250e43bc', 'Customer')
      )
    );

    verify(
      projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(project.getId()).once();
    verify(project.getName()).once();
    verify(project.isActive()).once();
    verify(project.getInvoiceUnit()).once();
    verify(project.getCustomer()).once();
    verify(customer.getId()).once();
    verify(customer.getName()).once();
  });

  it('testGetProjectNotFound', async () => {
    const projectRepository = mock(ProjectRepository);
    const queryHandler = new GetProjectByIdQueryHandler(
      instance(projectRepository)
    );
    when(
      projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('crm.projects.errors.not_found');
      verify(
        projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
