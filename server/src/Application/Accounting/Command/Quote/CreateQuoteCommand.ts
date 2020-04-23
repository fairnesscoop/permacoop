import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';
import {QuoteStatus} from 'src/Domain/Accounting/Quote.entity';

export class CreateQuoteCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly status: QuoteStatus,
    public readonly customerId: string,
    public readonly projectId?: string
  ) {}
}
