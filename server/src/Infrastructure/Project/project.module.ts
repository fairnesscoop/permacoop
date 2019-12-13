import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../bus.module';
import {TaskRepository} from './Repository/TaskRepository';
import {Task} from 'src/Domain/Project/Task.entity';
import {Project} from 'src/Domain/Project/Project.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CreateTaskCommandHandler} from 'src/Application/Project/Command/Task/CreateTaskCommandHandler';
import {IsTaskAlreadyExist} from 'src/Domain/Project/Specification/IsTaskAlreadyExist';
import {CreateTaskAction} from './Action/Task/CreateTaskAction';
import {CreateProjectAction} from './Action/Project/CreateProjectAction';
import {CreateProjectCommandHandler} from 'src/Application/Project/Command/Project/CreateProjectCommandHandler';
import {ProjectRepository} from './Repository/ProjectRepository';
import {IsProjectAlreadyExist} from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import {CustomerRepository} from '../Customer/Repository/CustomerRepository';
import {GetTasksAction} from './Action/Task/GetTasksAction';
import {GetTasksQueryHandler} from 'src/Application/Project/Query/Task/GetTasksQueryHandler';
import {GetProjectsAction} from './Action/Project/GetProjectsAction';
import {GetProjectsQueryHandler} from 'src/Application/Project/Query/Project/GetProjectsQueryHandler';
import {UpdateTaskCommandHandler} from 'src/Application/Project/Command/Task/UpdateTaskCommandHandler';
import {UpdateTaskAction} from './Action/Task/UpdateTaskAction';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Task, Project, Customer])],
  controllers: [
    CreateTaskAction,
    CreateProjectAction,
    GetTasksAction,
    GetProjectsAction,
    UpdateTaskAction
  ],
  providers: [
    {provide: 'ITaskRepository', useClass: TaskRepository},
    {provide: 'IProjectRepository', useClass: ProjectRepository},
    {provide: 'ICustomerRepository', useClass: CustomerRepository},
    CreateTaskCommandHandler,
    CreateProjectCommandHandler,
    IsTaskAlreadyExist,
    IsProjectAlreadyExist,
    GetTasksQueryHandler,
    GetProjectsQueryHandler,
    UpdateTaskCommandHandler
  ]
})
export class ProjectModule {}
