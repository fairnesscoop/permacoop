import {mock, instance, when, verify, anything, anyString} from 'ts-mockito';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {IsProjectAlreadyExist} from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {Project} from 'src/Domain/Project/Project.entity';
import {UpdateProjectCommand} from './UpdateProjectCommand';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';
import {ProjectAlreadyExistException} from 'src/Domain/Project/Exception/ProjectAlreadyExistException';
import {UpdateProjectCommandHandler} from './UpdateProjectCommandHandler';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';

describe('UpdateProjectCommandHandler', () => {
  let projectRepository: ProjectRepository;
  let customerRepository: CustomerRepository;
  let isProjectAlreadyExist: IsProjectAlreadyExist;
  let updatedProject: Project;
  let customer: Customer;
  let handler: UpdateProjectCommandHandler;

  const command = new UpdateProjectCommand();
  command.id = 'afda00b1-bf49-4102-9bc2-bce17f3acd48';
  command.name = 'Encom';
  command.customerId = 'd4aa560e-d2f7-422e-ae8d-6af5d0455eeb';

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
    when(isProjectAlreadyExist.isSatisfiedBy('Encom')).thenResolve(false);
    when(updatedProject.getId()).thenReturn(
      'afda00b1-bf49-4102-9bc2-bce17f3acd48'
    );
    when(updatedProject.getName()).thenReturn('z51');
    when(customer.getId()).thenReturn('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb');
    when(customer.getName()).thenReturn('Radio France');

    expect(await handler.execute(command)).toMatchObject(
      new ProjectView(
        'afda00b1-bf49-4102-9bc2-bce17f3acd48',
        anyString(),
        new CustomerView('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb', 'Radio France')
      )
    );

    verify(isProjectAlreadyExist.isSatisfiedBy('Encom')).once();
    verify(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).once();
    verify(
      customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
    ).once();
    verify(projectRepository.save(instance(updatedProject))).once();
    verify(
      updatedProject.updateCustomerAndName(instance(customer), 'Encom')
    ).once();
    verify(
      updatedProject.updateCustomerAndName(instance(customer), 'Encom')
    ).calledBefore(projectRepository.save(instance(updatedProject)));
    verify(updatedProject.getId()).once();
    verify(updatedProject.getName()).twice();
  });

  it('testProjectNotFound', async () => {
    when(
      projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('project.errors.not_found');
      verify(customerRepository.findOneById(anything())).never();
      verify(isProjectAlreadyExist.isSatisfiedBy(anything())).never();
      verify(
        projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
      ).once();
      verify(projectRepository.save(anything())).never();
      verify(
        updatedProject.updateCustomerAndName(anything(), anything())
      ).never();
      verify(updatedProject.getId()).never();
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
      expect(e.message).toBe('customer.errors.not_found');
      verify(isProjectAlreadyExist.isSatisfiedBy(anything())).never();
      verify(
        projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
      ).once();
      verify(
        customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
      ).once();
      verify(projectRepository.save(anything())).never();
      verify(
        updatedProject.updateCustomerAndName(anything(), anything())
      ).never();
      verify(updatedProject.getId()).never();
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
    when(isProjectAlreadyExist.isSatisfiedBy('Encom')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectAlreadyExistException);
      expect(e.message).toBe('project.errors.already_exist');
      verify(isProjectAlreadyExist.isSatisfiedBy('Encom')).once();
      verify(
        projectRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
      ).once();
      verify(
        customerRepository.findOneById('d4aa560e-d2f7-422e-ae8d-6af5d0455eeb')
      ).once();
      verify(projectRepository.save(anything())).never();
      verify(
        updatedProject.updateCustomerAndName(anything(), anything())
      ).never();
      verify(updatedProject.getId()).never();
      verify(updatedProject.getName()).once();
    }
  });
});
