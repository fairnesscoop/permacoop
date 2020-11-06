import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Put,
  Body
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateEventCommand } from 'src/Application/FairCalendar/Command/UpdateEventCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { EditEventDTO } from '../DTO/EditEventDTO';

@Controller('events')
@ApiTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Update event'})
  public async index(
    @Param() idDto: IdDTO,
    @Body() dto: EditEventDTO,
    @LoggedUser() user: User
  ) {
    const {type, time, summary, projectId, taskId} = dto;

    try {
      const id = await this.commandBus.execute(
        new UpdateEventCommand(
          idDto.id,
          user,
          type,
          Number(time),
          projectId,
          taskId,
          summary
        )
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
