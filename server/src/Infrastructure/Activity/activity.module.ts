import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../bus.module';
import {ActivityRepository} from './Repository/ActivityRepository';
import {Activity} from 'src/Domain/Activity/Activity.entity';
import {IsMaximumTimeSpentReached} from 'src/Domain/Activity/Specification/IsMaximumTimeSpentReached';
import {AddActivityAction} from './Action/AddActivityAction';
import {AddActivityCommandHandler} from 'src/Application/Activity/Command/AddActivityCommandHandler';
import {DeleteActivityAction} from './Action/DeleteActivityAction';
import {DeleteActivityCommandHandler} from 'src/Application/Activity/Command/DeleteActivityCommandHandler';
import {TaskRepository} from '../Task/Repository/TaskRepository';
import {Task} from 'src/Domain/Task/Task.entity';
import {GetActivityByIdQueryHandler} from 'src/Application/Activity/Query/GetActivityByIdQueryHandler';
import {Project} from 'src/Domain/Project/Project.entity';
import {ProjectRepository} from '../Project/Repository/ProjectRepository';
import {GetMonthlyActivitiesAction} from './Action/GetMonthlyActivitiesAction';
import {GetMonthlyActivitiesQueryHandler} from 'src/Application/Activity/Query/GetMonthlyActivitiesQueryHandler';
import {DateUtilsAdapter} from '../Adapter/DateUtilsAdapter';
import {IsActivityDeletable} from '../../Domain/Activity/Specification/IsActivityDeletable';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Project, Activity, Task])],
  controllers: [
    AddActivityAction,
    DeleteActivityAction,
    GetMonthlyActivitiesAction
  ],
  providers: [
    {provide: 'IProjectRepository', useClass: ProjectRepository},
    {provide: 'IActivityRepository', useClass: ActivityRepository},
    {provide: 'ITaskRepository', useClass: TaskRepository},
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    IsMaximumTimeSpentReached,
    IsActivityDeletable,
    GetActivityByIdQueryHandler,
    AddActivityCommandHandler,
    GetMonthlyActivitiesQueryHandler,
    DeleteActivityCommandHandler
  ]
})
export class ActivityModule {}
