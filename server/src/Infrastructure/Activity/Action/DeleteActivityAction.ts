import {
  Delete,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  HttpCode
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
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
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @ApiOperation({title: 'Delete activity'})
  @HttpCode(204)
  public async index(
    @Param() deleteActivityDto: DeleteActivityDTO,
    @LoggedUser() user: User
  ): Promise<boolean> {
    try {
      const {id: activityId} = deleteActivityDto;
      await this.commandBus.execute(
        new DeleteActivityCommand(user, activityId)
      );

      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
