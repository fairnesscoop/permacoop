import { Module } from '@nestjs/common';
import { HomeController } from './Controller/HomeController';

@Module({
  controllers: [HomeController]
})
export class HomeModule {}
