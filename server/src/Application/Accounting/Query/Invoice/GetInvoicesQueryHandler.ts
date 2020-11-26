import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInvoicesQuery } from './GetInvoicesQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { IInvoiceRepository } from 'src/Domain/Accounting/Repository/IInvoiceRepository';
import { InvoiceView } from '../../View/DailyRate/InvoiceView';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';

@QueryHandler(GetInvoicesQuery)
export class GetInvoicesQueryHandler {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository
  ) {}

  public async execute(query: GetInvoicesQuery): Promise<Pagination<InvoiceView>> {
    const results: InvoiceView[] = [];
    const [ invoices, total ] = await this.invoiceRepository.findInvoices(
      query.page
    );

    for (const invoice of invoices) {
      const project = invoice.getProject();
      const customer = project.getCustomer();

      results.push(
        new InvoiceView(
          invoice.getId(),
          invoice.getInvoiceId(),
          invoice.getStatus(),
          invoice.getCreatedAt(),
          invoice.getExpiryDate(),
          0,
          new ProjectView(
            project.getId(),
            project.getName(),
            null,
            null,
            new CustomerView(customer.getId(), customer.getName())
          )
        )
      );
    }

    return new Pagination<InvoiceView>(results, total);
  }
}
