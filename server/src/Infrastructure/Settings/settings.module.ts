import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { Address } from 'src/Domain/Customer/Address.entity';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Cooperative, Address])],
  controllers: [],
  providers: []
})
export class SettingsModule {}
