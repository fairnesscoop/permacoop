import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetCustomerAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get(':id')
  @ApiOperation({title: 'Get customer'})
  public async index(
    @Param() query: GetCustomerByIdQuery
  ): Promise<CustomerView> {
    try {
      return await this.queryBus.execute(query);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
