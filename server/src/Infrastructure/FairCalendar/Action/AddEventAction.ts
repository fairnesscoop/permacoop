import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {LoggedUser} from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {AddEventCommand} from 'src/Application/FairCalendar/Command/AddEventCommand';
import {EventDTO} from '../DTO/EventDTO';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';

@Controller('events')
@ApiTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class AddEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Add new event'})
  public async index(@Body() dto: EventDTO, @LoggedUser() user: User) {
    try {
      const {type, date, projectId, taskId, summary, time} = dto;
      const id = await this.commandBus.execute(
        new AddEventCommand(
          type,
          user,
          Number(time),
          new Date(date),
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
