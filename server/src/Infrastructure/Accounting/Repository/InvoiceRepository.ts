import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInvoiceRepository } from 'src/Domain/Accounting/Repository/IInvoiceRepository';
import { Invoice } from 'src/Domain/Accounting/Invoice.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

export class InvoiceRepository implements IInvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>
  ) {}

  public save(invoice: Invoice): Promise<Invoice> {
    return this.repository.save(invoice);
  }

  public countByYear(year: number): Promise<number> {
    return this.repository
      .createQueryBuilder('invoice')
      .select('invoice.id')
      .where('extract(year FROM invoice.createdAt) = :year', {year})
      .getCount();
  }

  public findInvoices(page: number): Promise<[Invoice[], number]> {
    return this.repository
      .createQueryBuilder('invoice')
      .select([
        'invoice.id',
        'invoice.invoiceId',
        'invoice.status',
        'invoice.createdAt',
        'invoice.expiryDate',
        'project.id',
        'project.name',
        'customer.id',
        'customer.name',
        'invoiceItem.id',
        'invoiceItem.amount',
        'invoiceItem.timeSpent'
      ])
      .where('invoiceItem.discount <> 100')
      .innerJoin('invoice.project', 'project')
      .innerJoin('project.customer', 'customer')
      .innerJoin('invoice.items', 'invoiceItem')
      .orderBy('invoice.createdAt', 'DESC')
      .groupBy('invoice.id, project.id, customer.id, invoiceItem.id')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
