import { ICommand } from 'src/Application/ICommand';
import { Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class UpdateLeaveRequestCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly type: Type,
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean,
    public readonly comment?: string
  ) {}
}
