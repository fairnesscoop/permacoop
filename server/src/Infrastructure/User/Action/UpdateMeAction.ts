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
import {UpdateUserDTO} from './DTO/UpdateUserDTO';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetUserByIdQuery} from 'src/Application/User/Query/GetUserByIdQuery';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateMeAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Put('me')
  @ApiOperation({title: 'Update current user'})
  public async index(
    @Body() updateUserDto: UpdateUserDTO,
    @LoggedUser() user: User
  ): Promise<UserView> {
    try {
      await this.commandBus.execute(
        new UpdateProfileCommand(
          user,
          updateUserDto.firstName,
          updateUserDto.lastName,
          updateUserDto.email,
          updateUserDto.password
        )
      );

      return await this.queryBus.execute(new GetUserByIdQuery(user.getId()));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
