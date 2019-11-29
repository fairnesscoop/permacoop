import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './Infrastructure/User/user.module';
import {ProjectModule} from './Infrastructure/Project/project.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ProjectModule]
})
export class AppModule {}
