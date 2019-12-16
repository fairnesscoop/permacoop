import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UpdateTaskCommand} from 'src/Application/Task/Command/UpdateTaskCommand';
import {GetTaskByIdQuery} from 'src/Application/Task/Query/GetTaskByIdQuery';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {TaskDTO} from './DTO/TaskDTO';
import {TaskIdDTO} from './DTO/TaskIdDTO';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateTaskAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Put(':id')
  @ApiOperation({title: 'Update task'})
  public async index(
    @Param() taskIdDto: TaskIdDTO,
    @Body() taskDto: TaskDTO
  ): Promise<TaskView> {
    try {
      await this.commandBus.execute(
        new UpdateTaskCommand(taskIdDto.id, taskDto.name)
      );

      return await this.queryBus.execute(new GetTaskByIdQuery(taskIdDto.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
