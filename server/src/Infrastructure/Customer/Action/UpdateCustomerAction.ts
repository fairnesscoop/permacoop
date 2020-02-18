import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {ICommandBus} from 'src/Application/ICommandBus';
import {UpdateCustomerCommand} from 'src/Application/Customer/Command/UpdateCustomerCommand';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {CustomerDTO} from './DTO/CustomerDTO';
import {CustomerIdDTO} from './DTO/CustomerIdDTO';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateCustomerAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Put(':id')
  @ApiOperation({title: 'Update customer'})
  public async index(
    @Param() customerIdDto: CustomerIdDTO,
    @Body() customerDto: CustomerDTO
  ): Promise<CustomerView> {
    try {
      const {id} = customerIdDto;
      await this.commandBus.execute(
        new UpdateCustomerCommand(id, customerDto.name)
      );

      return await this.queryBus.execute(new GetCustomerByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
