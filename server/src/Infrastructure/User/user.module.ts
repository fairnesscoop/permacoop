import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../bus.module';
import {User} from 'src/Domain/User/User.entity';
import {LoginController} from './Controller/Auth/LoginController';
import {RegisterController} from './Controller/Auth/RegisterController';
import {UserRepository} from './Repository/UserRepository';
import {LoginCommandHandler} from 'src/Application/User/Command/Auth/LoginCommandHandler';
import {RegisterCommandHandler} from 'src/Application/User/Command/Auth/RegisterCommandHandler';
import {EncryptionAdapter} from '../Adapter/EncryptionAdapter';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([User])],
  controllers: [LoginController, RegisterController],
  providers: [
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IEncryptionAdapter', useClass: EncryptionAdapter},
    LoginCommandHandler,
    RegisterCommandHandler,
    CanRegisterSpecification
  ]
})
export class UserModule {}
