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
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiImplicitParam
} from '@nestjs/swagger';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UpdateTaskCommand} from 'src/Application/Task/Command/UpdateTaskCommand';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateTaskAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Put(':id')
  @ApiImplicitParam({name: 'id'})
  @ApiOperation({title: 'Update task'})
  public async index(
    @Param('id') id,
    @Body() command: UpdateTaskCommand
  ): Promise<TaskView> {
    try {
      command.id = id;

      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
