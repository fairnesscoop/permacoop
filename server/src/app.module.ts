import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ProjectModule} from './Infrastructure/Project/project.module';
import {CustomerModule} from './Infrastructure/Customer/customer.module';
import {TaskModule} from './Infrastructure/Task/task.module';
import {AccountingModule} from './Infrastructure/Accounting/accounting.module';
import {FairCalendarModule} from './Infrastructure/FairCalendar/faircalendar.module';
import {FileModule} from './Infrastructure/File/file.module';
import {HumanResourceModule} from './Infrastructure/HumanResource/humanResource.module';
import { SettingsModule } from './Infrastructure/Settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    AccountingModule,
    CustomerModule,
    FairCalendarModule,
    FileModule,
    HumanResourceModule,
    ProjectModule,
    TaskModule,
    SettingsModule
  ]
})
export class AppModule {}
