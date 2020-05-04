import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {BusModule} from '../bus.module';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {File} from 'src/Domain/File/File.entity';
import {PayStub} from 'src/Domain/HumanResource/PayStub/PayStub.entity';
import {LoginAction} from './User/Action/LoginAction';
import {CreateUserAction} from './User/Action/CreateUserAction';
import {GetMeAction} from './User/Action/GetMeAction';
import {UpdateMeAction} from './User/Action/UpdateMeAction';
import {GetUsersAction} from './User/Action/GetUsersAction';
import {CreatePayStubAction} from './PayStub/Action/PayStub/CreatePayStubAction';
import {UserRepository} from './User/Repository/UserRepository';
import {PasswordEncoderAdapter} from '../Adapter/PasswordEncoderAdapter';
import {DateUtilsAdapter} from '../Adapter/DateUtilsAdapter';
import {PayStubRepository} from './PayStub/Repository/PayStubRepository';
import {FileRepository} from '../File/Repository/FileRepository';
import {CreatePayStubCommandHandler} from 'src/Application/HumanResource/PayStub/Command/CreatePayStubCommandHandler';
import {IsPayStubAlreadyExist} from 'src/Domain/HumanResource/PayStub/Specification/IsPayStubAlreadyExist';
import {LoginQueryHandler} from 'src/Application/HumanResource/User/Query/LoginQueryHandler';
import {CreateUserCommandHandler} from 'src/Application/HumanResource/User/Command/CreateUserCommandHandler';
import {GetUsersQueryHandler} from 'src/Application/HumanResource/User/Query/GetUsersQueryHandler';
import {IsEmailAlreadyExist} from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import {UpdateProfileCommandHandler} from 'src/Application/HumanResource/User/Command/UpdateProfileCommandHandler';
import {BearerStrategy} from './User/Security/BearerStrategy';
import {GetUserByIdQueryHandler} from 'src/Application/HumanResource/User/Query/GetUserByIdQueryHandler';
import {UserAdministrative} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import {UserAdministrativeRepository} from './User/Repository/UserAdministrativeRepository';
import {GetPayStubsAction} from './PayStub/Action/PayStub/GetPayStubsAction';
import {GetPayStubsQueryHandler} from 'src/Application/HumanResource/PayStub/Query/GetPayStubsQueryHandler';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([User, UserAdministrative, File, PayStub])
  ],
  controllers: [
    LoginAction,
    CreateUserAction,
    GetMeAction,
    UpdateMeAction,
    GetUsersAction,
    CreatePayStubAction,
    GetPayStubsAction
  ],
  providers: [
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter},
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    {provide: 'IPayStubRepository', useClass: PayStubRepository},
    {provide: 'IFileRepository', useClass: FileRepository},
    {
      provide: 'IUserAdministrativeRepository',
      useClass: UserAdministrativeRepository
    },
    CreatePayStubCommandHandler,
    IsPayStubAlreadyExist,
    LoginQueryHandler,
    CreateUserCommandHandler,
    IsEmailAlreadyExist,
    GetUsersQueryHandler,
    UpdateProfileCommandHandler,
    BearerStrategy,
    GetUserByIdQueryHandler,
    GetPayStubsQueryHandler
  ]
})
export class HumanResourceModule {}
