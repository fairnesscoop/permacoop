import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from './CreateProjectCommand';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { Project } from 'src/Domain/Project/Project.entity';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import { IsProjectAlreadyExist } from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import { ProjectAlreadyExistException } from 'src/Domain/Project/Exception/ProjectAlreadyExistException';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly isProjectAlreadyExist: IsProjectAlreadyExist
  ) {}

  public async execute(command: CreateProjectCommand): Promise<string> {
    const { name, customerId, active, invoiceUnit } = command;

    const customer = await this.customerRepository.findOneById(customerId);
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    if (true === (await this.isProjectAlreadyExist.isSatisfiedBy(name))) {
      throw new ProjectAlreadyExistException();
    }

    const project = await this.projectRepository.save(
      new Project(name, invoiceUnit, active, customer)
    );

    return project.getId();
  }
}
