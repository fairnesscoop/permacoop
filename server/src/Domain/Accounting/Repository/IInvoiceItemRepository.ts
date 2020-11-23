import { Invoice } from '../Invoice.entity';
import { InvoiceItem } from '../InvoiceItem.entity';

export interface IInvoiceItemRepository {
  save(items: InvoiceItem[]): void;
}
