import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './Infrastructure/User/user.module';
import {ProjectModule} from './Infrastructure/Project/project.module';
import {CustomerModule} from './Infrastructure/Customer/customer.module';
import {TaskModule} from './Infrastructure/Task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ProjectModule,
    CustomerModule,
    TaskModule
  ]
})
export class AppModule {}
