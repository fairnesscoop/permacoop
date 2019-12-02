import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {CreateProjectCommand} from './CreateProjectCommand';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {Project} from 'src/Domain/Project/Project.entity';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {ProjectView} from '../../View/ProjectView';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {IsProjectAlreadyExist} from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import {ProjectAlreadyExistException} from 'src/Domain/Project/Exception/ProjectAlreadyExistException';

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    private readonly isProjectAlreadyExist: IsProjectAlreadyExist
  ) {}

  public async execute(command: CreateProjectCommand): Promise<ProjectView> {
    const {name, customerId} = command;

    const customer = await this.queryBus.execute(
      new GetCustomerByIdQuery(customerId)
    );

    if (!customer) {
      throw new CustomerNotFoundException();
    }

    if (true === (await this.isProjectAlreadyExist.isSatisfiedBy(name))) {
      throw new ProjectAlreadyExistException();
    }

    const project = await this.projectRepository.save(
      new Project(name, customer)
    );

    return new ProjectView(
      project.getId(),
      project.getName(),
      new CustomerView(customer.getId(), customer.getName())
    );
  }
}
