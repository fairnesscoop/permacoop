import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class AddActivityCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly date: Date,
    public readonly time: number,
    public readonly projectId: string,
    public readonly taskId: string,
    public readonly summary?: string
  ) {}
}
