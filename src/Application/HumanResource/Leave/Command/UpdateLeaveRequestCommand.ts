import { ICommand } from 'src/Application/ICommand';
import { Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class UpdateLeaveRequestCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly type: Type,
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean,
    public readonly user: User,
    public readonly comment?: string
  ) {}
}
