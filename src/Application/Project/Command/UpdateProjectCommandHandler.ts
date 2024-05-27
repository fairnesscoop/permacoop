import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProjectCommand } from './UpdateProjectCommand';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { ProjectNotFoundException } from 'src/Domain/Project/Exception/ProjectNotFoundException';
import { IsProjectAlreadyExist } from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import { ProjectAlreadyExistException } from 'src/Domain/Project/Exception/ProjectAlreadyExistException';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly isProjectAlreadyExist: IsProjectAlreadyExist
  ) {}

  public async execute(command: UpdateProjectCommand): Promise<void> {
    const { id, name, customerId, invoiceUnit, active } = command;

    const project = await this.projectRepository.findOneById(id);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const customer = await this.customerRepository.findOneById(customerId);
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    if (
      name !== project.getName() &&
      true === (await this.isProjectAlreadyExist.isSatisfiedBy(name))
    ) {
      throw new ProjectAlreadyExistException();
    }

    project.update(customer, invoiceUnit, name, active);
    await this.projectRepository.save(project);
  }
}
