import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';
import {EventType} from 'src/Domain/FairCalendar/Event.entity';

export class AddEventCommand implements ICommand {
  constructor(
    public readonly type: EventType,
    public readonly user: User,
    public readonly time: number,
    public readonly date: Date,
    public readonly projectId?: string,
    public readonly taskId?: string,
    public readonly summary?: string
  ) {}
}
