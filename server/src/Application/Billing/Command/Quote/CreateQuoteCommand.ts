import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class CreateQuoteCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly status: string,
    public readonly customerId: string,
    public readonly projectId?: string
  ) {}
}
