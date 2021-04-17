import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { AddEventCommand } from 'src/Application/FairCalendar/Command/AddEventCommand';
import { AddEventDTO } from '../DTO/AddEventDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';

@Controller('events')
@ApiTags('FairCalendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class AddEventsAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Add new event(s)' })
  public async index(@Body() dto: AddEventDTO, @LoggedUser() user: User) {
    try {
      const {
        type,
        billable,
        startDate,
        endDate,
        projectId,
        taskId,
        summary,
        time
      } = dto;
      const result = await this.commandBus.execute(
        new AddEventCommand(
          type,
          user,
          time,
          billable === 'true',
          new Date(startDate),
          new Date(endDate),
          projectId,
          taskId,
          summary
        )
      );

      return { ...result };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
