import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../bus.module';
import {Project} from 'src/Domain/Project/Project.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CreateProjectAction} from './Action/CreateProjectAction';
import {CreateProjectCommandHandler} from 'src/Application/Project/Command/CreateProjectCommandHandler';
import {ProjectRepository} from './Repository/ProjectRepository';
import {IsProjectAlreadyExist} from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import {CustomerRepository} from '../Customer/Repository/CustomerRepository';
import {GetProjectsAction} from './Action/GetProjectsAction';
import {GetProjectsQueryHandler} from 'src/Application/Project/Query/GetProjectsQueryHandler';
import {UpdateProjectAction} from './Action/UpdateProjectAction';
import {GetProjectAction} from './Action/GetProjectAction';
import {GetProjectByIdQueryHandler} from 'src/Application/Project/Query/GetProjectByIdQueryHandler';
import {UpdateProjectCommandHandler} from 'src/Application/Project/Command/UpdateProjectCommandHandler';
import {ActivityRepository} from './Repository/ActivityRepository';
import {Activity} from 'src/Domain/Project/Activity.entity';
import {IsMaximumTimeSpentReached} from 'src/Domain/Project/Specification/IsMaximumTimeSpentReached';
import {AddActivityAction} from './Action/AddActivityAction';
import {AddActivityCommandHandler} from 'src/Application/Project/Command/Activity/AddActivityCommandHandler';
import {TaskRepository} from '../Task/Repository/TaskRepository';
import {Task} from 'src/Domain/Task/Task.entity';
import {GetActivityByIdQueryHandler} from 'src/Application/Project/Query/GetActivityByIdQueryHandler';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([Project, Customer, Activity, Task])
  ],
  controllers: [
    GetProjectsAction,
    GetProjectAction,
    CreateProjectAction,
    UpdateProjectAction,
    AddActivityAction
  ],
  providers: [
    {provide: 'IProjectRepository', useClass: ProjectRepository},
    {provide: 'ICustomerRepository', useClass: CustomerRepository},
    {provide: 'IActivityRepository', useClass: ActivityRepository},
    {provide: 'ITaskRepository', useClass: TaskRepository},
    CreateProjectCommandHandler,
    IsProjectAlreadyExist,
    IsMaximumTimeSpentReached,
    GetActivityByIdQueryHandler,
    GetProjectsQueryHandler,
    GetProjectByIdQueryHandler,
    UpdateProjectCommandHandler,
    AddActivityCommandHandler
  ]
})
export class ProjectModule {}
