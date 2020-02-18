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
import {ICommandBus} from 'src/Application/ICommandBus';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetTaskByIdQuery} from 'src/Application/Task/Query/GetTaskByIdQuery';
import {TaskDTO} from './DTO/TaskDTO';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateTaskAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post()
  @ApiOperation({title: 'Create new task'})
  public async index(@Body() taskDto: TaskDTO): Promise<TaskView> {
    try {
      const id = await this.commandBus.execute(
        new CreateTaskCommand(taskDto.name)
      );

      return await this.queryBus.execute(new GetTaskByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
