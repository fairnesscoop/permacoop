import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItem } from 'src/Domain/Accounting/InvoiceItem.entity';
import { IInvoiceItemRepository } from 'src/Domain/Accounting/Repository/IInvoiceItemRepository';

export class InvoiceItemRepository implements IInvoiceItemRepository {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly repository: Repository<InvoiceItem>
  ) {}

  public save(items: InvoiceItem[]): void {
    this.repository.save(items);
  }
}
