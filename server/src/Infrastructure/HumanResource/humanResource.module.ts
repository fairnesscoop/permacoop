import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { BusModule } from '../bus.module';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LoginController } from './User/Controller/LoginController';
import { LoginAction } from './User/Action/LoginAction';
import { CreateUserAction } from './User/Action/CreateUserAction';
import { GetMeAction } from './User/Action/GetMeAction';
import { UpdateMeAction } from './User/Action/UpdateMeAction';
import { GetUsersAction } from './User/Action/GetUsersAction';
import { UserRepository } from './User/Repository/UserRepository';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { LoginQueryHandler } from 'src/Application/HumanResource/User/Query/LoginQueryHandler';
import { CreateUserCommandHandler } from 'src/Application/HumanResource/User/Command/CreateUserCommandHandler';
import { GetUsersQueryHandler } from 'src/Application/HumanResource/User/Query/GetUsersQueryHandler';
import { IsEmailAlreadyExist } from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import { UpdateProfileCommandHandler } from 'src/Application/HumanResource/User/Command/UpdateProfileCommandHandler';
import { BearerStrategy } from './User/Security/BearerStrategy';
import { LocalStrategy } from './User/Security/LocalStrategy';
import { UserSerializer } from './User/Security/UserSerializer';
import { GetUserByIdQueryHandler } from 'src/Application/HumanResource/User/Query/GetUserByIdQueryHandler';
import { UserAdministrative } from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserAdministrativeRepository } from './User/Repository/UserAdministrativeRepository';
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
import { AcceptLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/AcceptLeaveRequestCommandHandler';
import { AcceptLeaveRequestAction } from './Leave/Action/AcceptLeaveRequestAction';
import { GetLeaveRequestsQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsQueryHandler';
import { GetLeaveRequestsAction } from './Leave/Action/GetLeaveRequestsAction';
import { GetLeaveRequestAction } from './Leave/Action/GetLeaveRequestAction';
import { DoesLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesLeaveExistForPeriod';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';
import { LeaveRepository } from './Leave/Repository/LeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { GetLeaveRequestByIdQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestByIdQueryHandler';
import { CooperativeRepository } from '../Settings/Repository/CooperativeRepository';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { UpdateUserAction } from './User/Action/UpdateUserAction';
import { GetUserAction } from './User/Action/GetUserAction';
import { UpdateUserCommandHandler } from 'src/Application/HumanResource/User/Command/UpdateUserCommandHandler';
import { GetUserAdministrativeByIdQueryHandler } from 'src/Application/HumanResource/User/Query/GetUserAdministrativeByIdQueryHandler';
import { GetLeavesAction } from './Leave/Action/GetLeavesAction';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalRepository } from './MealTicket/Repository/MealTicketRemovalRepository';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { CreateMealTicketRemovalCommandHandler } from 'src/Application/HumanResource/MealTicket/Command/CreateMealTicketRemovalCommandHandler';
import { CreateMealTicketRemovalAction } from './MealTicket/Action/CreateMealTicketRemovalAction';
import { DoesLeaveRequestBelongToUser } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestBelongToUser';
import { DeleteLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/DeleteLeaveRequestCommandHandler';
import { DeleteLeaveRequestAction } from './Leave/Action/DeleteLeaveRequestAction';
import { GetAvailableMealTicketsAction } from './MealTicket/Action/GetAvailableMealTicketsAction';
import { GetMealTicketsPerMonthQueryHandler } from 'src/Application/HumanResource/MealTicket/Query/GetMealTicketsPerMonthQueryHandler';
import { UpdateLeaveRequestAction } from './Leave/Action/UpdateLeaveRequestAction';
import { UpdateLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/UpdateLeaveRequestCommandHandler';
import { UserSavingsRecord } from 'src/Domain/HumanResource/Savings/UserSavingsRecord.entity';
import { UserSavingsRecordRepository } from './Savings/Repository/UserSavingsRecordRepository';
import { IncreaseUserSavingsRecordCommandHandler } from 'src/Application/HumanResource/Savings/Command/IncreaseUserSavingsRecordCommandHandler';
import { IncreaseUserSavingsRecordAction } from './Savings/Action/IncreaseUserSavingsRecordAction';
import { InterestRate } from 'src/Domain/HumanResource/Savings/InterestRate.entity';
import { InterestRateRepository } from './Savings/Repository/InterestRateRepository';
import { GetUsersElementsAction } from './Payslip/Action/GetUsersElementsAction';
import { GetUsersElementsCsvAction } from './Payslip/Action/GetUsersElementsCsvAction';
import { GetUsersElementsQueryHandler } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQueryHandler';
import { GetLeavesByMonthQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeavesByMonthQueryHandler';
import { GetLeavesCalendarAction } from './Leave/Action/GetLeavesCalendarAction';
import { GetLeavesCalendarQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeavesCalendarQueryHandler';
import { GetPendingLeaveRequestsCountAction } from './Leave/Action/GetPendingLeaveRequestsCountAction';
import { GetPendingLeaveRequestsCountQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetPendingLeaveRequestsCountQueryHandler';
import { LogoutController } from './User/Controller/LogoutController';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    PassportModule.register({
      session: true
    }),
    TypeOrmModule.forFeature([
      User,
      UserAdministrative,
      LeaveRequest,
      Leave,
      Event,
      Cooperative,
      MealTicketRemoval,
      UserSavingsRecord,
      InterestRate
    ]),
    ExtendedRoutingModule
  ],
  controllers: [
    LoginController,
    LogoutController,
    LoginAction,
    CreateUserAction,
    GetLeavesAction,
    GetLeavesCalendarAction,
    UpdateUserAction,
    GetMeAction,
    UpdateMeAction,
    GetUserAction,
    GetUsersAction,
    GetUsersElementsAction,
    GetUsersElementsCsvAction,
    GetLeaveRequestsAction,
    GetPendingLeaveRequestsCountAction,
    GetLeaveRequestAction,
    CreateLeaveRequestAction,
    RefuseLeaveRequestAction,
    AcceptLeaveRequestAction,
    CreateMealTicketRemovalAction,
    GetAvailableMealTicketsAction,
    DeleteLeaveRequestAction,
    CreateMealTicketRemovalAction,
    UpdateLeaveRequestAction,
    IncreaseUserSavingsRecordAction
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ILeaveRepository', useClass: LeaveRepository },
    { provide: 'ILeaveRequestRepository', useClass: LeaveRequestRepository },
    { provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter },
    { provide: 'IDateUtils', useClass: DateUtilsAdapter },
    { provide: 'IEventRepository', useClass: EventRepository },
    { provide: 'ICooperativeRepository', useClass: CooperativeRepository },
    {
      provide: 'IUserSavingsRecordRepository',
      useClass: UserSavingsRecordRepository
    },
    { provide: 'IInterestRateRepository', useClass: InterestRateRepository },
    {
      provide: 'IMealTicketRemovalRepository',
      useClass: MealTicketRemovalRepository
    },
    {
      provide: 'IUserAdministrativeRepository',
      useClass: UserAdministrativeRepository
    },
    {
      provide: 'IMealTicketRemovalRepository',
      useClass: MealTicketRemovalRepository
    },
    Date,
    LoginQueryHandler,
    CreateUserCommandHandler,
    IsEmailAlreadyExist,
    GetUsersQueryHandler,
    GetLeavesByMonthQueryHandler,
    UpdateProfileCommandHandler,
    UpdateUserCommandHandler,
    BearerStrategy,
    LocalStrategy,
    UserSerializer,
    GetUserByIdQueryHandler,
    GetUserAdministrativeByIdQueryHandler,
    GetUsersElementsQueryHandler,
    CreateLeaveRequestCommandHandler,
    DoesLeaveRequestExistForPeriod,
    RefuseLeaveRequestCommandHandler,
    CanLeaveRequestBeModerated,
    AcceptLeaveRequestCommandHandler,
    AcceptedLeaveRequestEventListener,
    LeaveRequestToLeavesConverter,
    GetLeaveRequestsQueryHandler,
    GetLeavesCalendarQueryHandler,
    GetPendingLeaveRequestsCountQueryHandler,
    GetLeaveRequestByIdQueryHandler,
    DoesLeaveExistForPeriod,
    DoesLeaveRequestBelongToUser,
    DeleteLeaveRequestCommandHandler,
    IsMealTicketRemovalAlreadyExist,
    CreateMealTicketRemovalCommandHandler,
    GetMealTicketsPerMonthQueryHandler,
    UpdateLeaveRequestCommandHandler,
    IncreaseUserSavingsRecordCommandHandler
  ]
})
export class HumanResourceModule {}
