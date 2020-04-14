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
import {ICommandBus} from 'src/Application/ICommandBus';
import {TaskDTO} from './DTO/TaskDTO';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateTaskAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @ApiOperation({title: 'Create new task'})
  public async index(@Body() taskDto: TaskDTO) {
    try {
      const id = await this.commandBus.execute(
        new CreateTaskCommand(taskDto.name)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
