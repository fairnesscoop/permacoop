import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class CreateLeaveRequestCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly type: Type,
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean,
    public readonly comment?: string
  ) {}
}
