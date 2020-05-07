import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export class RefuseHolidayCommand implements ICommand {
  constructor(
    public readonly moderator: User,
    public readonly id: string,
    public readonly moderationComment?: string
  ) {}
}
