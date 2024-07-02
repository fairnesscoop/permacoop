import { ICommand } from 'src/Application/ICommand';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { NotificationType } from 'src/Domain/Notification/Notification.entity';

export class CreateNotificationCommand implements ICommand {
  constructor(
    public readonly type: NotificationType,
    public readonly message: string,
    public readonly leaveReaquest?: LeaveRequest
  ) {}
}
