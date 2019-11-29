import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../bus.module';
import {User} from 'src/Domain/User/User.entity';
import {LoginAction} from './Action/Auth/LoginAction';
import {RegisterAction} from './Action/Auth/RegisterAction';
import {UserRepository} from './Repository/UserRepository';
import {LoginCommandHandler} from 'src/Application/User/Command/Auth/LoginCommandHandler';
import {RegisterCommandHandler} from 'src/Application/User/Command/Auth/RegisterCommandHandler';
import {EncryptionAdapter} from '../Adapter/EncryptionAdapter';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([User])],
  controllers: [LoginAction, RegisterAction],
  providers: [
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IEncryptionAdapter', useClass: EncryptionAdapter},
    LoginCommandHandler,
    RegisterCommandHandler,
    CanRegisterSpecification
  ]
})
export class UserModule {}
