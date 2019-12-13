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
import {TaskView} from 'src/Application/Project/View/TaskView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UpdateTaskCommand} from 'src/Application/Project/Command/Task/UpdateTaskCommand';

@Controller('tasks')
@ApiUseTags('Project')
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
