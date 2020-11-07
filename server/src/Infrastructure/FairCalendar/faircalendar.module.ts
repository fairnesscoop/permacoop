import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { EventRepository } from './Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { IsMaximumTimeSpentReached } from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReached';
import { AddEventsAction } from './Action/AddEventsAction';
import { AddEventCommandHandler } from 'src/Application/FairCalendar/Command/AddEventCommandHandler';
import { DeleteEventAction } from './Action/DeleteEventAction';
import { DeleteEventCommandHandler } from 'src/Application/FairCalendar/Command/DeleteEventCommandHandler';
import { TaskRepository } from '../Task/Repository/TaskRepository';
import { Task } from 'src/Domain/Task/Task.entity';
import { Project } from 'src/Domain/Project/Project.entity';
import { ProjectRepository } from '../Project/Repository/ProjectRepository';
import { GetMonthlyFairCalendarAction } from './Action/GetMonthlyFairCalendarAction';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { GetFairCalendarOverview } from 'src/Domain/FairCalendar/GetFairCalendarOverview';
import { GetMonthlyFairCalendarQueryHandler } from 'src/Application/FairCalendar/Query/GetMonthlyFairCalendarQueryHandler';
import { GetEventByIdQueryHandler } from 'src/Application/FairCalendar/Query/GetEventByIdQueryHandler';
import { GetEventAction } from './Action/GetEventAction';
import { UpdateEventAction } from './Action/UpdateEventAction';
import { DoesEventBelongToUser } from 'src/Domain/FairCalendar/Specification/DoesEventBelongToUser';
import { UpdateEventCommandHandler } from 'src/Application/FairCalendar/Command/UpdateEventCommandHandler';
import { IsMaximumTimeSpentReachedOnEdition } from 'src/Domain/FairCalendar/Specification/IsMaximumTimeSpentReachedOnEdition';
import { LeaveRepository } from '../HumanResource/Leave/Repository/LeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Project, Event, Task, Leave])],
  controllers: [
    AddEventsAction,
    DeleteEventAction,
    GetEventAction,
    UpdateEventAction,
    GetMonthlyFairCalendarAction
  ],
  providers: [
    {provide: 'ILeaveRepository', useClass: LeaveRepository},
    {provide: 'IProjectRepository', useClass: ProjectRepository},
    {provide: 'IEventRepository', useClass: EventRepository},
    {provide: 'ITaskRepository', useClass: TaskRepository},
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    Date,
    IsMaximumTimeSpentReached,
    AddEventCommandHandler,
    GetMonthlyFairCalendarQueryHandler,
    DeleteEventCommandHandler,
    UpdateEventCommandHandler,
    GetEventByIdQueryHandler,
    DoesEventBelongToUser,
    IsMaximumTimeSpentReachedOnEdition,
    GetFairCalendarOverview
  ]
})
export class FairCalendarModule {}
