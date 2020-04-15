import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Put,
  Body
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {EventIdDTO} from './DTO/EventIdDTO';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {EventDTO} from './DTO/EventDTO';
import {ICommandBus} from 'src/Application/ICommandBus';
import {UpdateEventCommand} from 'src/Application/FairCalendar/Command/UpdateEventCommand';

@Controller('events')
@ApiUseTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @ApiOperation({title: 'Update event'})
  public async index(
    @Param() idDto: EventIdDTO,
    @Body() dto: EventDTO,
    @LoggedUser() user: User
  ) {
    const {type, time, summary, projectId, taskId} = dto;

    try {
      const {id} = await this.commandBus.execute(
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
