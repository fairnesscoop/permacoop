import {Controller, Inject, Post, Body} from '@nestjs/common';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {RegisterCommand} from 'src/Application/User/Command/Auth/RegisterCommand';
import {AuthenticatedView} from 'src/Application/User/View/Auth/AuthenticatedView';

@Controller('register')
@ApiUseTags('Auth')
export class RegisterController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'User registration'})
  public async index(
    @Body() command: RegisterCommand
  ): Promise<AuthenticatedView> {
    return this.commandBus.execute(command);
  }
}
