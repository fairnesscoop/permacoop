import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './Infrastructure/User/user.module';
import {ProjectModule} from './Infrastructure/Project/project.module';
import {CustomerModule} from './Infrastructure/Customer/customer.module';
import {TaskModule} from './Infrastructure/Task/task.module';
import {ActivityModule} from './Infrastructure/Activity/activity.module';
import {BillingModule} from './Infrastructure/Billing/billing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    ActivityModule,
    BillingModule,
    CustomerModule,
    ProjectModule,
    TaskModule,
    UserModule
  ]
})
export class AppModule {}
