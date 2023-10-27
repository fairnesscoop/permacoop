import { Module } from '@nestjs/common';
import { BusModule } from '../bus.module';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { HomeController } from './Controller/HomeController';

@Module({
  imports: [BusModule, ExtendedRoutingModule],
  controllers: [HomeController]
})
export class HomeModule {}
