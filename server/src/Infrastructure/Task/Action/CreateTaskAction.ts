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
import {TaskDTO} from '../DTO/TaskDTO';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {UserRole} from 'src/Domain/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateTaskAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
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
