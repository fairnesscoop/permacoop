import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CreateTaskCommand} from 'src/Application/Project/Command/Task/CreateTaskCommand';
import {TaskView} from 'src/Application/Project/View/TaskView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';

@Controller('tasks')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateTaskAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Create a new task'})
  public async index(@Body() command: CreateTaskCommand): Promise<TaskView> {
    try {
      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
