import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { CreateCustomerCommand } from 'src/Application/Customer/Command/CreateCustomerCommand';
import { CustomerDTO } from '../DTO/CustomerDTO';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';

@Controller('app/faircalendar/events/add')
@UseGuards(IsAuthenticatedGuard)
export class AddCustomerController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('crm_customers_add')
  @Render('pages/customers_add')
  public async get() {
    return {};
  }

  @Post()
  public async index(@Body() customerDto: CustomerDTO, @Res() res: Response) {
    const { street, city, zipCode, country, name } = customerDto;

    try {
      await this.commandBus.execute(
        new CreateCustomerCommand(name, street, city, zipCode, country)
      );

      res.redirect(303, this.resolver.resolve('crm_customers_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
