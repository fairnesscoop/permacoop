import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './Infrastructure/User/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule]
})
export class AppModule {}
