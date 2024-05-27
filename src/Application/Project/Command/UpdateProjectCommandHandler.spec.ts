import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ProjectRepository } from 'src/Infrastructure/Project/Repository/ProjectRepository';
import { IsProjectAlreadyExist } from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import { InvoiceUnits, Project } from 'src/Domain/Project/Project.entity';
import { UpdateProjectCommand } from './UpdateProjectCommand';
import { ProjectNotFoundException } from 'src/Domain/Project/Exception/ProjectNotFoundException';
import { ProjectAlreadyExistException } from 'src/Domain/Project/Exception/ProjectAlreadyExistException';
import { UpdateProjectCommandHandler } from './UpdateProjectCommandHandler';
import { CustomerRepository } from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import { Customer } from 'src/Domain/Customer/Customer.entity';

describe('UpdateProjectCommandHandler', () => {
  let projectRepository: ProjectRepository;
  let customerRepository: CustomerRepository;
  let isProjectAlreadyExist: IsProjectAlreadyExist;
  let updatedProject: Project;
  let customer: Customer;
  let handler: UpdateProjectCommandHandler;

  const command = new UpdateProjectCommand(
    'afda00b1-bf49-4102-9bc2-bce17f3acd48',
    'Project',
    InvoiceUnits.HOUR,
    true,
    'd4aa560e-d2f7-422e-ae8d-6af5d0455eeb'
  );

  beforeEach(() => {
    projectRepository = mock(ProjectRepository);
    customerRepository = mock(CustomerRepository);
    isProjectAlreadyExist = mock(IsProjectAlreadyExist);
    updatedProject = mock(Project);
    customer = mock(Customer);

    handler = new UpdateProjectCommandHandler(
      instance(projectRepository),
      instance(customerRepository),
      instance(isProjectAlreadyExist)
    );
  });

  it('testUpdateSuccessfully', async () => {
    when(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedProject));
    when(
      customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
    ).thenResolve(instance(customer));
    when(isProjectAlreadyExist.isSatisfiedBy('Project')).thenResolve(false);
    when(updatedProject.getId()).thenReturn(
      'afda00b1-bf49-4102-9bc2-bce17f3acd48'
    );
    when(updatedProject.getName()).thenReturn('Old project');

    // Command return nothing
    expect(await handler.execute(command)).toBeUndefined();

    verify(isProjectAlreadyExist.isSatisfiedBy('Project')).once();
    verify(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).once();
    verify(
      customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
    ).once();
    verify(projectRepository.save(instance(updatedProject))).once();
    verify(
      updatedProject.update(
        instance(customer),
        InvoiceUnits.HOUR,
        'Project',
        true
      )
    ).once();
    verify(
      updatedProject.update(
        instance(customer),
        InvoiceUnits.HOUR,
        'Project',
        true
      )
    ).calledBefore(projectRepository.save(instance(updatedProject)));
    verify(updatedProject.getName()).once();
  });

  it('testProjectNotFound', async () => {
    when(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('crm.projects.errors.not_found');
      verify(customerRepository.findOneById(anything())).never();
      verify(isProjectAlreadyExist.isSatisfiedBy(anything())).never();
      verify(
        projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
      ).once();
      verify(projectRepository.save(anything())).never();
      verify(
        updatedProject.update(anything(), anything(), anything(), anything())
      ).never();
      verify(updatedProject.getName()).never();
    }
  });

  it('testCustomerNotFound', async () => {
    when(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedProject));
    when(
      customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('crm.customers.errors.not_found');
      verify(isProjectAlreadyExist.isSatisfiedBy(anything())).never();
      verify(
        projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
      ).once();
      verify(
        customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
      ).once();
      verify(projectRepository.save(anything())).never();
      verify(
        updatedProject.update(anything(), anything(), anything(), anything())
      ).never();
      verify(updatedProject.getName()).never();
    }
  });

  it('testProjectAlreadyExist', async () => {
    when(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedProject));
    when(
      customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
    ).thenResolve(instance(customer));
    when(isProjectAlreadyExist.isSatisfiedBy('Project')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectAlreadyExistException);
      expect(e.message).toBe('crm.projects.errors.already_exist');
      verify(isProjectAlreadyExist.isSatisfiedBy('Project')).once();
      verify(
        projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
      ).once();
      verify(
        customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
      ).once();
      verify(projectRepository.save(anything())).never();
      verify(
        updatedProject.update(anything(), anything(), anything(), anything())
      ).never();
      verify(updatedProject.getName()).once();
    }
  });
});
