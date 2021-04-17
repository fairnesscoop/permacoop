import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { TaskRepository } from '../Task/Repository/TaskRepository';
import { Task } from 'src/Domain/Task/Task.entity';
import { IsTaskAlreadyExist } from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import { CreateTaskAction } from '../Task/Action/CreateTaskAction';
import { GetTasksAction } from '../Task/Action/GetTasksAction';
import { UpdateTaskAction } from '../Task/Action/UpdateTaskAction';
import { GetTaskAction } from '../Task/Action/GetTaskAction';
import { CreateTaskCommandHandler } from 'src/Application/Task/Command/CreateTaskCommandHandler';
import { GetTasksQueryHandler } from 'src/Application/Task/Query/GetTasksQueryHandler';
import { UpdateTaskCommandHandler } from 'src/Application/Task/Command/UpdateTaskCommandHandler';
import { GetTaskByIdQueryHandler } from 'src/Application/Task/Query/GetTaskByIdQueryHandler';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Task])],
  controllers: [
    GetTasksAction,
    GetTaskAction,
    CreateTaskAction,
    UpdateTaskAction
  ],
  providers: [
    { provide: 'ITaskRepository', useClass: TaskRepository },
    CreateTaskCommandHandler,
    IsTaskAlreadyExist,
    GetTasksQueryHandler,
    UpdateTaskCommandHandler,
    GetTaskByIdQueryHandler
  ]
})
export class TaskModule {}
