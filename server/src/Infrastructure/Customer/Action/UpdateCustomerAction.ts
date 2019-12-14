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
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiImplicitParam
} from '@nestjs/swagger';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UpdateCustomerCommand} from 'src/Application/Customer/Command/UpdateCustomerCommand';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateCustomerAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Put(':id')
  @ApiImplicitParam({name: 'id'})
  @ApiOperation({title: 'Update customer'})
  public async index(
    @Param('id') id,
    @Body() command: UpdateCustomerCommand
  ): Promise<CustomerView> {
    try {
      command.id = id;

      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
