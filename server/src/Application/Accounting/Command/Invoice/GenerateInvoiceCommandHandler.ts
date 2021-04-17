import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GenerateInvoiceCommand } from './GenerateInvoiceCommand';
import { IEventRepository } from 'src/Domain/FairCalendar/Repository/IEventRepository';
import { Invoice } from 'src/Domain/Accounting/Invoice.entity';
import { InvoiceItem } from 'src/Domain/Accounting/InvoiceItem.entity';
import { IInvoiceRepository } from 'src/Domain/Accounting/Repository/IInvoiceRepository';
import { IInvoiceItemRepository } from 'src/Domain/Accounting/Repository/IInvoiceItemRepository';
import { InvoiceIdGenerator } from 'src/Domain/Accounting/Generators/InvoiceIdGenerator';
import { NoBillableEventsFoundException } from 'src/Domain/Accounting/Exception/NoBillableEventsFoundException';
import { IDateUtils } from 'src/Application/IDateUtils';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { ProjectNotFoundException } from 'src/Domain/Project/Exception/ProjectNotFoundException';
import { Project } from 'src/Domain/Project/Project.entity';

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceCommandHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject('IInvoiceItemRepository')
    private readonly invoiceItemRepository: IInvoiceItemRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly invoiceIdGenerator: InvoiceIdGenerator
  ) {}

  public async execute(command: GenerateInvoiceCommand): Promise<string> {
    const { projectId, status, user, expireInDays } = command;

    const project = await this.projectRepository.findOneById(projectId);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const currentDate = this.dateUtils.getCurrentDate();
    const [invoiceId, events] = await Promise.all([
      this.invoiceIdGenerator.generate(),
      this.eventRepository.findBillableEventsByMonthAndProject(
        currentDate,
        project
      )
    ]);

    if (0 === events.length) {
      throw new NoBillableEventsFoundException();
    }

    const expiryDate = this.dateUtils.addDaysToDate(currentDate, expireInDays);
    const invoiceItems: InvoiceItem[] = [];
    const invoice = new Invoice(
      invoiceId,
      status,
      expiryDate.toISOString(),
      user,
      project
    );

    for (const event of events) {
      invoiceItems.push(this.buildInvoiceItem(invoice, project, event));
    }

    const savedInvoice = await this.invoiceRepository.save(invoice);
    await this.invoiceItemRepository.save(invoiceItems);

    return savedInvoice.getId();
  }

  private buildInvoiceItem(
    invoice: Invoice,
    project: Project,
    { time_spent, billable, task_name, first_name, last_name, daily_rate }
  ): InvoiceItem {
    const quantity =
      Math.round((time_spent / project.getDayDuration()) * 100) / 100;

    return new InvoiceItem(
      invoice,
      `${task_name} - ${first_name} ${last_name}`,
      Math.round(quantity * 100),
      daily_rate ? daily_rate : 0,
      billable ? 0 : 10000
    );
  }
}
