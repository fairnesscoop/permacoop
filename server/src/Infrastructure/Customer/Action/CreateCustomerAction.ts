import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CreateCustomerCommand} from 'src/Application/Customer/Command/CreateCustomerCommand';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateCustomerAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Create new customer'})
  public async index(
    @Body() command: CreateCustomerCommand
  ): Promise<CustomerView> {
    try {
      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
