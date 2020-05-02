import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './Infrastructure/User/user.module';
import {ProjectModule} from './Infrastructure/Project/project.module';
import {CustomerModule} from './Infrastructure/Customer/customer.module';
import {TaskModule} from './Infrastructure/Task/task.module';
import {AccountingModule} from './Infrastructure/Accounting/accounting.module';
import {FairCalendarModule} from './Infrastructure/FairCalendar/faircalendar.module';
import {FileModule} from './Infrastructure/File/file.module';
import {PayStubModule} from './Infrastructure/PayStub/payStub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    AccountingModule,
    CustomerModule,
    FairCalendarModule,
    FileModule,
    PayStubModule,
    ProjectModule,
    TaskModule,
    UserModule
  ]
})
export class AppModule {}
