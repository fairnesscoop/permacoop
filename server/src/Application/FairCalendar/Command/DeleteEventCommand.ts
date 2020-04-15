import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class DeleteEventCommand implements ICommand {
  constructor(public readonly id: string, public readonly user: User) {}
}
