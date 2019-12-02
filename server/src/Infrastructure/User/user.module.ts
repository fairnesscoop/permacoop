import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {BusModule} from '../bus.module';
import {User} from 'src/Domain/User/User.entity';
import {LoginAction} from './Action/LoginAction';
import {CreateUserAction} from './Action/CreateUserAction';
import {UserRepository} from './Repository/UserRepository';
import {LoginCommandHandler} from 'src/Application/User/Command/LoginCommandHandler';
import {CreateUserCommandHandler} from 'src/Application/User/Command/CreateUserCommandHandler';
import {EncryptionAdapter} from '../Adapter/EncryptionAdapter';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';
import {BearerStrategy} from './Security/BearerStrategy';

@Module({
  imports: [BusModule, PassportModule, TypeOrmModule.forFeature([User])],
  controllers: [LoginAction, CreateUserAction],
  providers: [
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IEncryptionAdapter', useClass: EncryptionAdapter},
    LoginCommandHandler,
    CreateUserCommandHandler,
    CanRegisterSpecification,
    BearerStrategy
  ]
})
export class UserModule {}
