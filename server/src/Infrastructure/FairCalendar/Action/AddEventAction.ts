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
import {User} from 'src/Domain/User/User.entity';
import {AddEventCommand} from 'src/Application/FairCalendar/Command/AddEventCommand';
import {EventDTO} from './DTO/EventDTO';

@Controller('events')
@ApiUseTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class AddEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
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
