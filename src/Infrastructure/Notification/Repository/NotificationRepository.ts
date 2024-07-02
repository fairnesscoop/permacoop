import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INotificationRepository } from 'src/Domain/Notification/Repository/INotificationRepository';
import {
  Notification,
  NotificationType
} from 'src/Domain/Notification/Notification.entity';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>
  ) {}

  public save(notification: Notification): Promise<Notification> {
    return this.repository.save(notification);
  }

  public findByLeaveRequestIdAndType(
    leaveRequestId: string,
    type: NotificationType
  ): Promise<Notification> {
    const query = this.repository
      .createQueryBuilder('notification')
      .select(['notification.resourceId'])
      .where(
        'notification.leaveRequestId = :leaveRequestId AND notification.type = :type',
        { leaveRequestId, type }
      )
      .getOne();

    return query;
  }
}
