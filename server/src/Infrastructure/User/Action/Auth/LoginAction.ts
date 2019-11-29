import {
  Controller,
  Inject,
  Post,
  Body,
  UnauthorizedException
} from '@nestjs/common';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {LoginCommand} from 'src/Application/User/Command/Auth/LoginCommand';
import {AuthenticatedView} from 'src/Application/User/View/AuthenticatedView';

@Controller('login')
@ApiUseTags('Auth')
export class LoginAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'User authentication'})
  public async index(
    @Body() command: LoginCommand
  ): Promise<AuthenticatedView> {
    try {
      return await this.commandBus.execute(command);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
