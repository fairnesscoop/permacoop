import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BusModule } from '../bus.module';
import { EventRepository } from './Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { IsMaximumTimeSpentReached } from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';
import { AddEventCommandHandler } from 'src/Application/FairCalendar/Command/AddEventCommandHandler';
import { DeleteEventCommandHandler } from 'src/Application/FairCalendar/Command/DeleteEventCommandHandler';
import { TaskRepository } from '../Task/Repository/TaskRepository';
import { Task } from 'src/Domain/Task/Task.entity';
import { Project } from 'src/Domain/Project/Project.entity';
import { ProjectRepository } from '../Project/Repository/ProjectRepository';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { GetMonthlyFairCalendarQueryHandler } from 'src/Application/FairCalendar/Query/GetMonthlyFairCalendarQueryHandler';
import { GetEventByIdQueryHandler } from 'src/Application/FairCalendar/Query/GetEventByIdQueryHandler';
import { DoesEventBelongToUser } from 'src/Domain/FairCalendar/Specification/DoesEventBelongToUser';
import { UpdateEventCommandHandler } from 'src/Application/FairCalendar/Command/UpdateEventCommandHandler';
import { LeaveRepository } from '../HumanResource/Leave/Repository/LeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { CooperativeRepository } from '../Settings/Repository/CooperativeRepository';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { FluentTranslatorAdapter } from '../Adapter/FluentTranslatorAdapter';
import { FairCalendarController } from './Controller/FairCalendarController';
import { AddEventController } from './Controller/AddEventController';
import { EditEventController } from './Controller/EditEventController';
import { DeleteEventController } from './Controller/DeleteEventController';
import { FairCalendarOverviewFactory } from 'src/Domain/FairCalendar/FairCalendarOverviewFactory';
import { FairCalendarOverviewTableFactory } from './Table/FairCalendarOverviewTableFactory';
import { TranslationsModule } from '../Translations/translations.module';
import { TablesModule } from '../Tables/tables.module';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    TypeOrmModule.forFeature([Project, Event, Task, Leave, Cooperative]),
    TranslationsModule,
    TablesModule,
    ExtendedRoutingModule
  ],
  controllers: [
    FairCalendarController,
    AddEventController,
    EditEventController,
    DeleteEventController
  ],
  providers: [
    { provide: 'ILeaveRepository', useClass: LeaveRepository },
    { provide: 'IProjectRepository', useClass: ProjectRepository },
    { provide: 'IEventRepository', useClass: EventRepository },
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'ICooperativeRepository', useClass: CooperativeRepository },
    { provide: 'IDateUtils', useClass: DateUtilsAdapter },
    { provide: 'ITranslator', useClass: FluentTranslatorAdapter },
    Date,
    IsMaximumTimeSpentReached,
    AddEventCommandHandler,
    GetMonthlyFairCalendarQueryHandler,
    DeleteEventCommandHandler,
    UpdateEventCommandHandler,
    GetEventByIdQueryHandler,
    DoesEventBelongToUser,
    FairCalendarOverviewFactory,
    FairCalendarOverviewTableFactory
  ]
})
export class FairCalendarModule {}
