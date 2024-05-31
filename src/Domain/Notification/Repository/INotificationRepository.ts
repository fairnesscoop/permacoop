import { Notification, NotificationType } from '../Notification.entity';

export interface INotificationRepository {
  save(notification: Notification): Promise<Notification>;
  findByLeaveRequestIdAndType(
    leaveRequestId: string,
    type: NotificationType
  ): Promise<Notification>;
}
