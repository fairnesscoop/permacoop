import {Module} from '@nestjs/common';
import {UserModule} from './Infrastructure/User/user.module';
import {BusModule} from './Infrastructure/bus.module';

@Module({
  imports: [BusModule, UserModule]
})
export class AppModule {}
