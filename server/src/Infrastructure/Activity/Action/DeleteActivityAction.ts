import {
  Delete,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {DeleteActivityCommand} from 'src/Application/Activity/Command/DeleteActivityCommand';
import {DeleteActivityDTO} from './DTO/DeleteActivityDTO';

@Controller('activities')
@ApiUseTags('Activity')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class DeleteActivityAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Delete(':id')
  @ApiOperation({title: 'Delete activity'})
  public async index(
    @Param() deleteActivityDto: DeleteActivityDTO,
    @LoggedUser() user: User
  ): Promise<any> {
    try {
      const {id: activityId} = deleteActivityDto;
      const id = await this.commandBus.execute(
        new DeleteActivityCommand(user, activityId)
      );

      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
