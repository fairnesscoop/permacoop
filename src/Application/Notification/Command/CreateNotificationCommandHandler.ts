import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Notification, NotificationType } from 'src/Domain/Notification/Notification.entity';
import { CreateNotificationCommand } from './CreateNotificationCommand';
import { INotificationRepository } from 'src/Domain/Notification/Repository/INotificationRepository';
import { IMattermostNotifier } from 'src/Application/IMattermostNotifier';

const { MATTERMOST_CHANNEL_LEAVES_ID } = process.env;

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler {
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
    @Inject('IMattermostNotifier')
    private readonly mattermostNotifier: IMattermostNotifier,
    ) {}

  public async execute(command: CreateNotificationCommand): Promise<string> {
    const { message, type, leaveReaquest } = command;

    if (type === NotificationType.POST) {
      const { id } = await this.mattermostNotifier.createPost(MATTERMOST_CHANNEL_LEAVES_ID, message);
      const notification = await this.notificationRepository.save(
        new Notification(
          type,
          message,
          id,
          leaveReaquest
        )
      );

      return notification.getId();
    }

    throw new Error('Type not managed');
  }
}
