import { ICommand } from 'src/Application/ICommand';
import { InvoiceUnits } from 'src/Domain/Project/Project.entity';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly dayDuration: number,
    public readonly invoiceUnit: InvoiceUnits,
    public readonly customerId: string
  ) {}
}
