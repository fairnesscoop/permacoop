import { Module, Provider } from '@nestjs/common';
import { APP_FILTER, DiscoveryModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './Infrastructure/Home/home.module';
import { ProjectModule } from './Infrastructure/Project/project.module';
import { CustomerModule } from './Infrastructure/Customer/customer.module';
import { TaskModule } from './Infrastructure/Task/task.module';
import { FairCalendarModule } from './Infrastructure/FairCalendar/faircalendar.module';
import { HumanResourceModule } from './Infrastructure/HumanResource/humanResource.module';
import { SettingsModule } from './Infrastructure/Settings/settings.module';
import { UnexpectedErrorFilter } from './Infrastructure/Common/ExceptionFilter/UnexpectedErrorFilter';
import { AuthRequiredFilter } from './Infrastructure/Common/ExceptionFilter/AuthRequiredFilter';
import { dataSourceOptions } from './datasource';
import { ExtendedRoutingModule } from './Infrastructure/Common/ExtendedRouting/extendedRouting.module';
import { NotificationModule } from './Infrastructure/Notification/notification.module';

const providers: Provider[] = [];

if (process.env.NODE_ENV !== 'production') {
  providers.push({
    provide: APP_FILTER,
    useClass: UnexpectedErrorFilter
  });
}

providers.push({
  provide: APP_FILTER,
  useClass: AuthRequiredFilter
});

@Module({
  imports: [
    DiscoveryModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env']
    }),
    NotificationModule,
    HomeModule,
    CustomerModule,
    FairCalendarModule,
    HumanResourceModule,
    ProjectModule,
    TaskModule,
    SettingsModule,
    ExtendedRoutingModule
  ],
  providers
})
export class AppModule {}
