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
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {BearerStrategy} from './Security/BearerStrategy';
import {GetUsersQueryHandler} from 'src/Application/User/Query/GetUsersQueryHandler';
import {GetUsersAction} from './Action/GetUsersAction';
import {GetMeAction} from './Action/GetMeAction';
import {UpdateMeAction} from './Action/UpdateMeAction';
import {UpdateProfileCommandHandler} from 'src/Application/User/Command/UpdateProfileCommandHandler';

@Module({
  imports: [BusModule, PassportModule, TypeOrmModule.forFeature([User])],
  controllers: [
    LoginAction,
    CreateUserAction,
    GetMeAction,
    UpdateMeAction,
    GetUsersAction
  ],
  providers: [
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IEncryptionAdapter', useClass: EncryptionAdapter},
    LoginCommandHandler,
    CreateUserCommandHandler,
    IsEmailAlreadyExist,
    GetUsersQueryHandler,
    UpdateProfileCommandHandler,
    BearerStrategy
  ]
})
export class UserModule {}
