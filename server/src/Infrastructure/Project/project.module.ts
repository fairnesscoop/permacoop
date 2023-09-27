import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Project } from 'src/Domain/Project/Project.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { CreateProjectCommandHandler } from 'src/Application/Project/Command/CreateProjectCommandHandler';
import { ProjectRepository } from './Repository/ProjectRepository';
import { IsProjectAlreadyExist } from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import { CustomerRepository } from '../Customer/Repository/CustomerRepository';
import { GetProjectsQueryHandler } from 'src/Application/Project/Query/GetProjectsQueryHandler';
import { GetProjectByIdQueryHandler } from 'src/Application/Project/Query/GetProjectByIdQueryHandler';
import { UpdateProjectCommandHandler } from 'src/Application/Project/Command/UpdateProjectCommandHandler';
import { ListProjectsController } from './Controller/ListProjectsController';
import { AddProjectController } from './Controller/AddProjectController';
import { EditProjectController } from './Controller/EditProjectController';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { ProjectTableFactory } from './Table/ProjectTableFactory';
import { TablesModule } from '../Tables/tables.module';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([Project, Customer]),
    ExtendedRoutingModule,
    TablesModule
  ],
  controllers: [
    ListProjectsController,
    AddProjectController,
    EditProjectController
  ],
  providers: [
    { provide: 'IProjectRepository', useClass: ProjectRepository },
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    CreateProjectCommandHandler,
    IsProjectAlreadyExist,
    GetProjectsQueryHandler,
    GetProjectByIdQueryHandler,
    UpdateProjectCommandHandler,
    ProjectTableFactory
  ]
})
export class ProjectModule {}
