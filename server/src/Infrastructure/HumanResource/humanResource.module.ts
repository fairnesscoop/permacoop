import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {BusModule} from '../bus.module';
import {DateUtilsAdapter} from '../Adapter/DateUtilsAdapter';
import {User} from 'src/Domain/User/User.entity';
import {UserRepository} from '../User/Repository/UserRepository';
import {PayStub} from 'src/Domain/HumanResource/PayStub.entity';
import {PayStubRepository} from './Repository/PayStubRepository';
import {CreatePayStubAction} from './Action/PayStub/CreatePayStubAction';
import {CreatePayStubCommandHandler} from 'src/Application/HumanResource/PayStub/CreatePayStubCommandHandler';
import {File} from 'src/Domain/File/File.entity';
import {FileRepository} from '../File/Repository/FileRepository';
import {IsPayStubAlreadyExist} from 'src/Domain/HumanResource/Specification/IsPayStubAlreadyExist';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    TypeOrmModule.forFeature([File, User, PayStub])
  ],
  controllers: [CreatePayStubAction],
  providers: [
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IPayStubRepository', useClass: PayStubRepository},
    {provide: 'IFileRepository', useClass: FileRepository},
    CreatePayStubCommandHandler,
    IsPayStubAlreadyExist
  ]
})
export class HumanResourceModule {}
