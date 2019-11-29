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

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Task, Project, Customer])],
  controllers: [CreateTaskAction],
  providers: [
    {provide: 'ITaskRepository', useClass: TaskRepository},
    CreateTaskCommandHandler,
    IsTaskAlreadyExist
  ]
})
export class ProjectModule {}
