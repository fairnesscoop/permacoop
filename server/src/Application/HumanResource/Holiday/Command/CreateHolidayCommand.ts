import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {HolidayLeaveType} from 'src/Domain/HumanResource/Holiday/Holiday.entity';

export class CreateHolidayCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly leaveType: HolidayLeaveType,
    public readonly startDate: string,
    public readonly startsAllDay: boolean,
    public readonly endDate: string,
    public readonly endsAllDay: boolean,
    public readonly comment?: string
  ) {}
}
