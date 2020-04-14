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
import {AddActivityCommand} from 'src/Application/Activity/Command/AddActivityCommand';
import {ActivityDTO} from './DTO/ActivityDTO';
import {IQueryBus} from 'src/Application/IQueryBus';

@Controller('activities')
@ApiUseTags('Activity')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class AddActivityAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post()
  @ApiOperation({title: 'Add new activity'})
  public async index(
    @Body() activityDto: ActivityDTO,
    @LoggedUser() user: User
  ) {
    try {
      const {date, projectId, taskId, summary, time} = activityDto;
      const id = await this.commandBus.execute(
        new AddActivityCommand(
          user,
          new Date(date),
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
