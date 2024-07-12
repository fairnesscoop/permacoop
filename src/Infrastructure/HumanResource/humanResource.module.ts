import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { BusModule } from '../bus.module';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LoginController } from './User/Controller/LoginController';
import { UserRepository } from './User/Repository/UserRepository';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { LoginQueryHandler } from 'src/Application/HumanResource/User/Query/LoginQueryHandler';
import { CreateUserCommandHandler } from 'src/Application/HumanResource/User/Command/CreateUserCommandHandler';
import { GetUsersQueryHandler } from 'src/Application/HumanResource/User/Query/GetUsersQueryHandler';
import { IsEmailAlreadyExist } from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import { UpdateProfileCommandHandler } from 'src/Application/HumanResource/User/Command/UpdateProfileCommandHandler';
import { LocalStrategy } from './User/Security/LocalStrategy';
import { UserSerializer } from './User/Security/UserSerializer';
import { GetUserByIdQueryHandler } from 'src/Application/HumanResource/User/Query/GetUserByIdQueryHandler';
import { UserAdministrative } from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserAdministrativeRepository } from './User/Repository/UserAdministrativeRepository';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { LeaveRequestRepository } from './Leave/Repository/LeaveRequestRepository';
import { CreateLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/CreateLeaveRequestCommandHandler';
import { DoesLeaveRequestExistForPeriod } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestExistForPeriod';
import { RefuseLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/RefuseLeaveRequestCommandHandler';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { CanLeaveRequestBeCancelled } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeCancelled';
import { AcceptedLeaveRequestEventListener } from 'src/Application/HumanResource/Leave/Event/AcceptedLeaveRequestEventListener';
import { EventRepository } from '../FairCalendar/Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { AcceptLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/AcceptLeaveRequestCommandHandler';
import { GetLeaveRequestsQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsQueryHandler';
import { DoesLeaveExistForPeriod } from 'src/Domain/FairCalendar/Specification/DoesLeaveExistForPeriod';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';
import { LeaveRepository } from './Leave/Repository/LeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { GetLeaveRequestByIdQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestByIdQueryHandler';
import { CooperativeRepository } from '../Settings/Repository/CooperativeRepository';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { UpdateUserCommandHandler } from 'src/Application/HumanResource/User/Command/UpdateUserCommandHandler';
import { GetUserAdministrativeByIdQueryHandler } from 'src/Application/HumanResource/User/Query/GetUserAdministrativeByIdQueryHandler';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalRepository } from './MealTicket/Repository/MealTicketRemovalRepository';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { CreateMealTicketRemovalCommandHandler } from 'src/Application/HumanResource/MealTicket/Command/CreateMealTicketRemovalCommandHandler';
import { DoesLeaveRequestBelongToUser } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestBelongToUser';
import { DeleteLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/DeleteLeaveRequestCommandHandler';
import { GetMealTicketsPerMonthQueryHandler } from 'src/Application/HumanResource/MealTicket/Query/GetMealTicketsPerMonthQueryHandler';
import { UpdateLeaveRequestCommandHandler } from 'src/Application/HumanResource/Leave/Command/UpdateLeaveRequestCommandHandler';
import { UserSavingsRecord } from 'src/Domain/HumanResource/Savings/UserSavingsRecord.entity';
import { UserSavingsRecordRepository } from './Savings/Repository/UserSavingsRecordRepository';
import { IncreaseUserSavingsRecordCommandHandler } from 'src/Application/HumanResource/Savings/Command/IncreaseUserSavingsRecordCommandHandler';
import { IncreaseUserSavingsRecordAction } from './Savings/Action/IncreaseUserSavingsRecordAction';
import { InterestRate } from 'src/Domain/HumanResource/Savings/InterestRate.entity';
import { InterestRateRepository } from './Savings/Repository/InterestRateRepository';
import { GetUsersElementsQueryHandler } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQueryHandler';
import { GetLeavesByMonthQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeavesByMonthQueryHandler';
import { GetLeavesCalendarQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeavesCalendarQueryHandler';
import { GetPendingLeaveRequestsCountQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetPendingLeaveRequestsCountQueryHandler';
import { LogoutController } from './User/Controller/LogoutController';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { EditProfileController } from './User/Controller/EditProfileController';
import { ListUsersController } from './User/Controller/ListUsersController';
import { UserTableFactory } from './User/Table/UserTableFactory';
import { AddUserController } from './User/Controller/AddUserController';
import { EditUserController } from './User/Controller/EditUserController';
import { ListLeaveRequestsController } from './Leave/Controller/ListLeaveRequestsController';
import { AddLeaveRequestController } from './Leave/Controller/AddLeaveRequestController';
import { EditLeaveRequestController } from './Leave/Controller/EditLeaveRequestController';
import { LeaveRequestTableFactory } from './Leave/Table/LeaveRequestTableFactory';
import { GetLeaveRequestController } from './Leave/Controller/GetLeaveRequestController';
import { ModerateLeaveRequestController } from './Leave/Controller/ModerateLeaveRequestController';
import { DeleteLeaveRequestController } from './Leave/Controller/DeleteLeaveRequestController';
import { GetPayrollElementsController } from './PayrollElements/Controller/GetPayrollElementsController';
import { PayrollElementsTableFactory } from './PayrollElements/Table/PayrollElementsTableFactory';
import { FluentTranslatorAdapter } from '../Adapter/FluentTranslatorAdapter';
import { TablesModule } from '../Tables/tables.module';
import { ListMealTicketsController } from './MealTicket/Controller/ListMealTicketsController';
import { MealTicketTableFactory } from './MealTicket/Table/MealTicketTableFactory';
import { AddMealTicketRemovalController } from './MealTicket/Controller/AddMealTicketRemovalController';
import { ExportLeavesCalendarController } from './Leave/Controller/ExportLeavesCalendarController';
import { LeaveRequestsOverviewTableFactory } from './Leave/Table/LeaveRequestOverviewTableFactory';
import { GetLeaveRequestsOverviewQueryHandler } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsOverviewQueryHandler';
import { TemplatesModule } from '../Templates/templates.module';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    HttpModule,
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
    TemplatesModule,
    ExtendedRoutingModule,
    TablesModule
  ],
  controllers: [
    LoginController,
    LogoutController,
    ListUsersController,
    AddUserController,
    EditUserController,
    EditProfileController,
    ListLeaveRequestsController,
    AddLeaveRequestController,
    EditLeaveRequestController,
    GetLeaveRequestController,
    ModerateLeaveRequestController,
    DeleteLeaveRequestController,
    ExportLeavesCalendarController,
    GetPayrollElementsController,
    ListMealTicketsController,
    AddMealTicketRemovalController,
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
    { provide: 'ITranslator', useClass: FluentTranslatorAdapter },
    Date,
    LoginQueryHandler,
    CreateUserCommandHandler,
    IsEmailAlreadyExist,
    GetUsersQueryHandler,
    GetLeavesByMonthQueryHandler,
    UpdateProfileCommandHandler,
    UpdateUserCommandHandler,
    LocalStrategy,
    UserSerializer,
    GetUserByIdQueryHandler,
    GetUserAdministrativeByIdQueryHandler,
    GetUsersElementsQueryHandler,
    CreateLeaveRequestCommandHandler,
    DoesLeaveRequestExistForPeriod,
    RefuseLeaveRequestCommandHandler,
    CanLeaveRequestBeModerated,
    CanLeaveRequestBeCancelled,
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
    IncreaseUserSavingsRecordCommandHandler,
    UserTableFactory,
    LeaveRequestTableFactory,
    GetLeaveRequestsOverviewQueryHandler,
    LeaveRequestsOverviewTableFactory,
    PayrollElementsTableFactory,
    MealTicketTableFactory
  ]
})
export class HumanResourceModule {}
