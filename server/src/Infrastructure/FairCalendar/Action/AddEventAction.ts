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
import {ICommandBus} from 'src/Application/ICommandBus';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User, UserRole} from 'src/Domain/User/User.entity';
import {AddEventCommand} from 'src/Application/FairCalendar/Command/AddEventCommand';
import {EventDTO} from '../DTO/EventDTO';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';

@Controller('events')
@ApiUseTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class AddEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Add new event'})
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
