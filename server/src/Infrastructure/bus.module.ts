import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';

const providers = [];

@Module({
  imports: [CqrsModule],
  providers: [...providers],
  exports: [...providers]
})
export class BusModule {}
