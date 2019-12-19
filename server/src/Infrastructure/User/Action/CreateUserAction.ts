import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {CreateUserCommand} from 'src/Application/User/Command/CreateUserCommand';
import {UserView} from 'src/Application/User/View/UserView';
import {UserDTO} from './DTO/UserDTO';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetUserByIdQuery} from 'src/Application/User/Query/GetUserByIdQuery';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateUserAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Create new user account'})
  public async index(@Body() userDto: UserDTO): Promise<UserView> {
    try {
      const {firstName, lastName, email, password} = userDto;
      const id = await this.commandBus.execute(
        new CreateUserCommand(firstName, lastName, email, password)
      );

      return await this.queryBus.execute(new GetUserByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
