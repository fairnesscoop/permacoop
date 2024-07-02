import { ICommand } from 'src/Application/ICommand';
import { InvoiceUnits } from 'src/Domain/Project/Project.entity';

export class UpdateProjectCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly invoiceUnit: InvoiceUnits,
    public readonly active: boolean,
    public readonly customerId: string
  ) {}
}
