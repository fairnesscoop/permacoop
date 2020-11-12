import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { BusModule } from '../bus.module';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { File } from 'src/Domain/File/File.entity';
import { PaySlip } from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import { LoginAction } from './User/Action/LoginAction';
import { CreateUserAction } from './User/Action/CreateUserAction';
import { GetMeAction } from './User/Action/GetMeAction';
import { UpdateMeAction } from './User/Action/UpdateMeAction';
import { GetUsersAction } from './User/Action/GetUsersAction';
import { UserRepository } from './User/Repository/UserRepository';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { PaySlipRepository } from './PaySlip/Repository/PaySlipRepository';
import { FileRepository } from '../File/Repository/FileRepository';
import { CreatePaySlipCommandHandler } from 'src/Application/HumanResource/PaySlip/Command/CreatePaySlipCommandHandler';
import { IsPaySlipAlreadyExist } from 'src/Domain/HumanResource/PaySlip/Specification/IsPaySlipAlreadyExist';
import { LoginQueryHandler } from 'src/Application/HumanResource/User/Query/LoginQueryHandler';
import { CreateUserCommandHandler } from 'src/Application/HumanResource/User/Command/CreateUserCommandHandler';
import { GetUsersQueryHandler } from 'src/Application/HumanResource/User/Query/GetUsersQueryHandler';
import { IsEmailAlreadyExist } from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import { UpdateProfileCommandHandler } from 'src/Application/HumanResource/User/Command/UpdateProfileCommandHandler';
import { BearerStrategy } from './User/Security/BearerStrategy';
import { GetUserByIdQueryHandler } from 'src/Application/HumanResource/User/Query/GetUserByIdQueryHandler';
import { UserAdministrative } from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserAdministrativeRepository } from './User/Repository/UserAdministrativeRepository';
import { GetPaySlipsQueryHandler } from 'src/Application/HumanResource/PaySlip/Query/GetPaySlipsQueryHandler';
import { CreatePaySlipAction } from './PaySlip/Action/CreatePaySlipAction';
import { GetPaySlipsAction } from './PaySlip/Action/GetPaySlipsAction';
import { DownloadPaySlipAction } from './PaySlip/Action/DownloadPaySlipAction';
import { GetPaySlipByIdQueryHandler } from 'src/Application/HumanResource/PaySlip/Query/GetPaySlipByIdQueryHandler';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { LeaveRequestRepository } from './Leave/Repository/LeaveRequestRepository';
import { CreateLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/CreateLeaveRequestCommandHandler';
import { DoesLeaveRequestExistForPeriod } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestExistForPeriod';
import { CreateLeaveRequestAction } from './Leave/Action/CreateLeaveRequestAction';
import { RefuseLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/RefuseLeaveRequestCommandHandler';
import { RefuseLeaveRequestAction } from './Leave/Action/RefuseLeaveRequestAction';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { AcceptedLeaveRequestEventListener } from 'src/Application/HumanResource/Leave/Event/AcceptedLeaveRequestEventListener';
import { EventRepository } from '../FairCalendar/Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { AcceptLeaveRequestAction } from './Leave/Action/AcceptLeaveRequestAction';
import { GetLeaveRequestsQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsQueryHandler';
import { GetLeaveRequestsAction } from './Leave/Action/GetLeaveRequestsAction';
import { DoesEventsExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesEventsExistForPeriod';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';
import { LeaveRepository } from './Leave/Repository/LeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { GetUsersPresenceAction } from './User/Action/GetUsersPresenceAction';
import { GetUsersPresenceQueryHandler } from 'src/Application/HumanResource/User/Query/GetUsersPresenceQueryHandler';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([
      User,
      UserAdministrative,
      File,
      PaySlip,
      LeaveRequest,
      Leave,
      Event
    ])
  ],
  controllers: [
    LoginAction,
    CreateUserAction,
    GetMeAction,
    UpdateMeAction,
    GetUsersAction,
    GetUsersPresenceAction,
    CreatePaySlipAction,
    GetPaySlipsAction,
    DownloadPaySlipAction,
    GetLeaveRequestsAction,
    CreateLeaveRequestAction,
    RefuseLeaveRequestAction,
    AcceptLeaveRequestAction
  ],
  providers: [
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'ILeaveRepository', useClass: LeaveRepository},
    {provide: 'ILeaveRequestRepository', useClass: LeaveRequestRepository},
    {provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter},
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    {provide: 'IPaySlipRepository', useClass: PaySlipRepository},
    {provide: 'IFileRepository', useClass: FileRepository},
    {provide: 'IEventRepository', useClass: EventRepository},
    {
      provide: 'IUserAdministrativeRepository',
      useClass: UserAdministrativeRepository
    },
    CreatePaySlipCommandHandler,
    IsPaySlipAlreadyExist,
    LoginQueryHandler,
    CreateUserCommandHandler,
    IsEmailAlreadyExist,
    GetUsersQueryHandler,
    UpdateProfileCommandHandler,
    BearerStrategy,
    GetUserByIdQueryHandler,
    GetPaySlipsQueryHandler,
    GetPaySlipByIdQueryHandler,
    CreateLeaveRequestCommandHandler,
    DoesLeaveRequestExistForPeriod,
    RefuseLeaveRequestCommandHandler,
    CanLeaveRequestBeModerated,
    AcceptedLeaveRequestEventListener,
    LeaveRequestToLeavesConverter,
    GetLeaveRequestsQueryHandler,
    DoesEventsExistForPeriod,
    GetUsersPresenceQueryHandler
  ]
})
export class HumanResourceModule {}
