import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { InvoiceStatus } from 'src/Domain/Accounting/Invoice.entity';

export class InvoiceView {
  constructor(
    public readonly id: string,
    public readonly invoiceId: string,
    public readonly status: InvoiceStatus,
    public readonly createdAt: string,
    public readonly expiryDate: string,
    public readonly amount: number,
    public readonly project: ProjectView
  ) {}
}
