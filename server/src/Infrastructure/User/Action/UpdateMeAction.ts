import {
  Controller,
  Inject,
  Put,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UserView} from 'src/Application/User/View/UserView';
import {UpdateProfileCommand} from 'src/Application/User/Command/UpdateProfileCommand';
import {LoggedUser} from '../Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateMeAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Put('me')
  @ApiOperation({title: 'Update current user'})
  public async index(
    @Body() command: UpdateProfileCommand,
    @LoggedUser() user: User
  ): Promise<UserView> {
    try {
      command.user = user;

      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
