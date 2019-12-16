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
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {CustomerDTO} from './DTO/CustomerDTO';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateCustomerAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'Create new customer'})
  public async index(@Body() customerDto: CustomerDTO): Promise<CustomerView> {
    try {
      const id = await this.commandBus.execute(
        new CreateCustomerCommand(customerDto.name)
      );

      return await this.queryBus.execute(new GetCustomerByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
