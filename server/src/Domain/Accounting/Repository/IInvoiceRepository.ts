import { Invoice } from '../Invoice.entity';

export interface IInvoiceRepository {
  save(invoice: Invoice): Promise<Invoice>;
  countByYear(year: number): Promise<number>;
  findInvoices(page: number): Promise<[Invoice[], number]>;
}
