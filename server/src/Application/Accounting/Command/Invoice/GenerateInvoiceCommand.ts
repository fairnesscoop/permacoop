import { ICommand } from 'src/Application/ICommand';
import { InvoiceStatus } from 'src/Domain/Accounting/Invoice.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class GenerateInvoiceCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly status: InvoiceStatus,
    public readonly expireInDays: number,
    public readonly user: User
  ) {}
}
