import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class CreateMealTicketRemovalCommand implements ICommand {
  constructor(
    public readonly date: string,
    public readonly user: User,
    public readonly comment?: string
  ) {}
}
