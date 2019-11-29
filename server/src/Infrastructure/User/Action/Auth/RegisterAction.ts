import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException
} from '@nestjs/common';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {RegisterCommand} from 'src/Application/User/Command/Auth/RegisterCommand';
import {AuthenticatedView} from 'src/Application/User/View/AuthenticatedView';

@Controller('register')
@ApiUseTags('Auth')
export class RegisterAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'User registration'})
  public async index(
    @Body() command: RegisterCommand
  ): Promise<AuthenticatedView> {
    try {
      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
