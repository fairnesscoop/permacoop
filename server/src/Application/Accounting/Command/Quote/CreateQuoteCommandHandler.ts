import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateQuoteCommand} from './CreateQuoteCommand';
import {IQuoteRepository} from 'src/Domain/Accounting/Repository/IQuoteRepository';
import {Quote} from 'src/Domain/Accounting/Quote.entity';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {QuoteIdGenerator} from 'src/Domain/Accounting/Generators/QuoteIdGenerator';
import {InvalidProjectException} from 'src/Domain/Accounting/Exception/InvalidProjectException';

@CommandHandler(CreateQuoteCommand)
export class CreateQuoteCommandHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    private readonly quoteIdGenerator: QuoteIdGenerator
  ) {}

  public async execute(command: CreateQuoteCommand): Promise<string> {
    const {customerId, status, user, projectId} = command;
    let project = null;

    const customer = await this.customerRepository.findOneById(customerId);
    if (!(customer instanceof Customer)) {
      throw new CustomerNotFoundException();
    }

    if (projectId) {
      project = await this.projectRepository.findOneById(projectId);
      if (!project || project.getCustomer().getId() !== customer.getId()) {
        throw new InvalidProjectException();
      }
    }

    const quoteId = await this.quoteIdGenerator.generate();
    const quote = await this.quoteRepository.save(
      new Quote(quoteId, status, user, customer, project)
    );

    return quote.getId();
  }
}
