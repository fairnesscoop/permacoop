import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './Infrastructure/Project/project.module';
import { CustomerModule } from './Infrastructure/Customer/customer.module';
import { TaskModule } from './Infrastructure/Task/task.module';
import { FairCalendarModule } from './Infrastructure/FairCalendar/faircalendar.module';
import { FileModule } from './Infrastructure/File/file.module';
import { HumanResourceModule } from './Infrastructure/HumanResource/humanResource.module';
import { SettingsModule } from './Infrastructure/Settings/settings.module';
import { ContactModule } from './Infrastructure/Contact/contact.module';

import { dataSourceOptions } from './datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot(),
    CustomerModule,
    FairCalendarModule,
    FileModule,
    HumanResourceModule,
    ProjectModule,
    TaskModule,
    SettingsModule,
    ContactModule
  ]
})
export class AppModule {}
