import { CustomerView } from 'src/Application/Customer/View/CustomerView';

export class ProjectView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly invoiceUnit?: string,
    public readonly customer?: CustomerView
  ) {}
}
