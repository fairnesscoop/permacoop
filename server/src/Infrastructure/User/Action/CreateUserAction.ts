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

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateUserAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Create new user account'})
  public async index(@Body() command: CreateUserCommand): Promise<UserView> {
    try {
      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
