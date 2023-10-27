import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBusAdapter } from './Adapter/CommandBusAdapter';
import { QueryBusAdapter } from './Adapter/QueryBusAdapter';
import { EventBusAdapter } from './Adapter/EventBusAdapter';

const providers = [
  { provide: 'ICommandBus', useClass: CommandBusAdapter },
  { provide: 'IQueryBus', useClass: QueryBusAdapter },
  { provide: 'IEventBus', useClass: EventBusAdapter }
];

@Module({
  imports: [CqrsModule],
  providers: [...providers],
  exports: [...providers]
})
export class BusModule {}
