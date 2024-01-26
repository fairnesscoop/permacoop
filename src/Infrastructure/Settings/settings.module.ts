import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { CooperativeRepository } from './Repository/CooperativeRepository';
import { GetCooperativeAction } from './Action/GetCooperativeAction';
import { GetCooperativeQueryHandler } from 'src/Application/Settings/Query/GetCooperativeQueryHandler';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Cooperative])],
  controllers: [GetCooperativeAction],
  providers: [
    { provide: 'ICooperativeRepository', useClass: CooperativeRepository },
    GetCooperativeQueryHandler
  ]
})
export class SettingsModule {}
