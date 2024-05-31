import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BusModule } from '../bus.module';
import { Notification } from 'src/Domain/Notification/Notification.entity';
import { NotificationRepository } from './Repository/NotificationRepository';
import { MattermostNotifier } from '../Adapter/MattermostNotifier';
import { CreateNotificationCommandHandler } from 'src/Application/Notification/Command/CreateNotificationCommandHandler';

@Module({
  imports: [
    HttpModule,
    BusModule,
    ConfigModule,
    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [],
  providers: [
    { provide: 'INotificationRepository', useClass: NotificationRepository },
    { provide: 'IMattermostNotifier', useClass: MattermostNotifier },
    CreateNotificationCommandHandler
  ]
})
export class NotificationModule {}
