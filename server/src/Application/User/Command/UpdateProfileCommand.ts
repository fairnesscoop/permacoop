import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password?: string
  ) {}
}
