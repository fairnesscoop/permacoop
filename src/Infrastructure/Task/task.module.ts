import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { TaskRepository } from '../Task/Repository/TaskRepository';
import { Task } from 'src/Domain/Task/Task.entity';
import { IsTaskAlreadyExist } from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import { CreateTaskCommandHandler } from 'src/Application/Task/Command/CreateTaskCommandHandler';
import { GetTasksQueryHandler } from 'src/Application/Task/Query/GetTasksQueryHandler';
import { UpdateTaskCommandHandler } from 'src/Application/Task/Command/UpdateTaskCommandHandler';
import { GetTaskByIdQueryHandler } from 'src/Application/Task/Query/GetTaskByIdQueryHandler';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { ListTasksController } from './Controller/ListTasksController';
import { AddTaskController } from './Controller/AddTaskController';
import { EditTaskController } from './Controller/EditTaskController';
import { TaskTableFactory } from './Table/TaskTableFactory';
import { TablesModule } from '../Tables/tables.module';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([Task]),
    ExtendedRoutingModule,
    TablesModule
  ],
  controllers: [ListTasksController, AddTaskController, EditTaskController],
  providers: [
    { provide: 'ITaskRepository', useClass: TaskRepository },
    CreateTaskCommandHandler,
    IsTaskAlreadyExist,
    GetTasksQueryHandler,
    UpdateTaskCommandHandler,
    GetTaskByIdQueryHandler,
    TaskTableFactory
  ]
})
export class TaskModule {}
