import { Notification } from "../Notification.entity";

export interface INotificationRepository {
  save(notification: Notification): Promise<Notification>;
}
