import {ICommand} from 'src/Application/ICommand';
import {UserRole} from 'src/Domain/User/User.entity';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly entryDate?: Date
  ) {}
}
