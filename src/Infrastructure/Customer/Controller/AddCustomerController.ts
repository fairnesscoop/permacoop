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
import { CustomerDTO } from 'server/src/Infrastructure/Customer/DTO/CustomerDTO';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';

@Controller('app/customers/add')
@UseGuards(IsAuthenticatedGuard)
export class AddCustomerController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('crm_customers_add')
  @Render('pages/customers/add.njk')
  public async get() {
    return {};
  }

  @Post()
  public async post(@Body() customerDto: CustomerDTO, @Res() res: Response) {
    const { name } = customerDto;

    try {
      await this.commandBus.execute(new CreateCustomerCommand(name));

      res.redirect(303, this.resolver.resolve('crm_customers_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
