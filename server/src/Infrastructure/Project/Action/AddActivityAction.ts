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
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {AddActivityCommand} from 'src/Application/Project/Command/Activity/AddActivityCommand';
import {AddActivityDTO} from './DTO/AddActivityDTO';
import {ActivityView} from 'src/Application/Project/View/ActivityView';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetActivityByIdQuery} from 'src/Application/Project/Query/GetActivityByIdQuery';

@Controller('activities')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class AddActivityAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Add new activity'})
  public async index(
    @Body() addActivityDto: AddActivityDTO,
    @LoggedUser() user: User
  ): Promise<ActivityView> {
    try {
      const {date, projectId, taskId, summary, time} = addActivityDto;
      const id = await this.commandBus.execute(
        new AddActivityCommand(
          user,
          new Date(date),
          time,
          projectId,
          taskId,
          summary
        )
      );

      return await this.queryBus.execute(new GetActivityByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
