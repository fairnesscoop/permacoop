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
import {CreateTaskCommand} from 'src/Application/Task/Command/CreateTaskCommand';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateTaskAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Create new task'})
  public async index(@Body() command: CreateTaskCommand): Promise<TaskView> {
    try {
      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
