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
import {ICommandBus} from 'src/Application/ICommandBus';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {CustomerDTO} from './DTO/CustomerDTO';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateCustomerAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post()
  @ApiOperation({title: 'Create new customer'})
  public async index(@Body() customerDto: CustomerDTO): Promise<CustomerView> {
    const {
      address: {street, city, zipCode, country},
      name
    } = customerDto;

    try {
      const id = await this.commandBus.execute(
        new CreateCustomerCommand(name, street, city, zipCode, country)
      );

      return await this.queryBus.execute(new GetCustomerByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
