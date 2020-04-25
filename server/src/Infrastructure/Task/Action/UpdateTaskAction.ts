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
import {ICommandBus} from 'src/Application/ICommandBus';
import {UpdateTaskCommand} from 'src/Application/Task/Command/UpdateTaskCommand';
import {TaskDTO} from '../DTO/TaskDTO';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {UserRole} from 'src/Domain/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateTaskAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Update task'})
  public async index(@Param() dto: IdDTO, @Body() taskDto: TaskDTO) {
    try {
      const {id} = dto;
      await this.commandBus.execute(new UpdateTaskCommand(id, taskDto.name));

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
