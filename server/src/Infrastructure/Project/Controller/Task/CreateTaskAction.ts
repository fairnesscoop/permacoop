import {Body, Post, Controller} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {CreateTaskCommand} from 'src/Application/Project/Command/Task/CreateTaskCommand';
import {TaskView} from 'src/Application/Project/View/TaskView';

@Controller('tasks')
@ApiUseTags('Project')
export class CreateTaskAction {
  @Post()
  public index(@Body() command: CreateTaskCommand): Promise<TaskView> {
    return;
  }
}
