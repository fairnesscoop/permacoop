import {instance, mock, when, deepEqual, verify, anything} from 'ts-mockito';
import {CreateProjectCommandHandler} from 'src/Application/Project/Command/CreateProjectCommandHandler';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {IsProjectAlreadyExist} from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import {CreateProjectCommand} from 'src/Application/Project/Command/CreateProjectCommand';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {ProjectAlreadyExistException} from 'src/Domain/Project/Exception/ProjectAlreadyExistException';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {Project} from 'src/Domain/Project/Project.entity';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';

describe('CreateProjectCommandHandler', () => {
  let projectRepository: ProjectRepository;
  let customerRepository: CustomerRepository;
  let isProjectAlreadyExist: IsProjectAlreadyExist;
  let handler: CreateProjectCommandHandler;

  const command = new CreateProjectCommand();
  command.name = 'z51';
  command.customerId = 'b5e8dc18-ca67-4323-bdae-654afe09499f';

  beforeEach(() => {
    projectRepository = mock(ProjectRepository);
    customerRepository = mock(CustomerRepository);
    isProjectAlreadyExist = mock(IsProjectAlreadyExist);

    handler = new CreateProjectCommandHandler(
      instance(projectRepository),
      instance(customerRepository),
      instance(isProjectAlreadyExist)
    );
  });

  it('testCustomerNotFound', async () => {
    when(
      customerRepository.findOneById('b5e8dc18-ca67-4323-bdae-654afe09499f')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('customer.errors.not_found');
      verify(
        customerRepository.findOneById('b5e8dc18-ca67-4323-bdae-654afe09499f')
      ).once();
      verify(isProjectAlreadyExist.isSatisfiedBy(anything())).never();
      verify(projectRepository.save(anything())).never();
    }
  });

  it('testProjectAlreadyExist', async () => {
    when(
      customerRepository.findOneById('b5e8dc18-ca67-4323-bdae-654afe09499f')
    ).thenResolve(new Customer('Radio France'));
    when(isProjectAlreadyExist.isSatisfiedBy('z51')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectAlreadyExistException);
      expect(e.message).toBe('project.errors.already_exist');
      verify(
        customerRepository.findOneById('b5e8dc18-ca67-4323-bdae-654afe09499f')
      ).once();
      verify(isProjectAlreadyExist.isSatisfiedBy('z51')).once();
      verify(projectRepository.save(anything())).never();
    }
  });

  it('testProjectCreatedSuccessfully', async () => {
    const createdProject = mock(Project);
    const customer = mock(Customer);

    when(isProjectAlreadyExist.isSatisfiedBy('z51')).thenResolve(false);
    when(customer.getId()).thenReturn('b5e8dc18-ca67-4323-bdae-654afe09499f');
    when(customer.getName()).thenReturn('Radio France');
    when(createdProject.getId()).thenReturn(
      'ec9b683c-c075-41d9-8f85-532b2a2428f1'
    );
    when(createdProject.getName()).thenReturn('z51');
    when(
      customerRepository.findOneById('b5e8dc18-ca67-4323-bdae-654afe09499f')
    ).thenResolve(instance(customer));
    when(
      projectRepository.save(deepEqual(new Project('z51', instance(customer))))
    ).thenResolve(instance(createdProject));

    expect(await handler.execute(command)).toMatchObject(
      new ProjectView(
        'ec9b683c-c075-41d9-8f85-532b2a2428f1',
        'z51',
        new CustomerView('b5e8dc18-ca67-4323-bdae-654afe09499f', 'Radio France')
      )
    );

    verify(
      customerRepository.findOneById('b5e8dc18-ca67-4323-bdae-654afe09499f')
    ).once();
    verify(isProjectAlreadyExist.isSatisfiedBy('z51')).once();
    verify(
      projectRepository.save(deepEqual(new Project('z51', instance(customer))))
    ).once();
  });
});
