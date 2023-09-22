import { Module } from '@nestjs/common';
import { HomeController } from './Controller/HomeController';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';

@Module({
  imports: [ExtendedRoutingModule],
  controllers: [HomeController]
})
export class HomeModule {}
