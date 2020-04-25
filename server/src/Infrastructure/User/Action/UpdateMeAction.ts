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
import {ICommandBus} from 'src/Application/ICommandBus';
import {UserView} from 'src/Application/User/View/UserView';
import {UpdateProfileCommand} from 'src/Application/User/Command/UpdateProfileCommand';
import {LoggedUser} from '../Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetUserByIdQuery} from 'src/Application/User/Query/GetUserByIdQuery';
import {ProfileDTO} from '../DTO/ProfileDTO';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateMeAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Put('me')
  @ApiOperation({title: 'Update current user'})
  public async index(
    @Body() dto: ProfileDTO,
    @LoggedUser() user: User
  ): Promise<UserView> {
    try {
      const {firstName, lastName, email, password} = dto;
      await this.commandBus.execute(
        new UpdateProfileCommand(user, firstName, lastName, email, password)
      );

      return await this.queryBus.execute(new GetUserByIdQuery(user.getId()));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
