import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { IQueryBus } from 'src/Application/IQueryBus';
import { Response } from 'express';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { GetCustomerByIdQuery } from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import { CustomerDTO } from 'src/Infrastructure/Customer/DTO/CustomerDTO';
import { UpdateCustomerCommand } from 'src/Application/Customer/Command/UpdateCustomerCommand';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';

@Controller('app/customers/edit')
@UseGuards(IsAuthenticatedGuard)
export class EditCustomerController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get(':id')
  @WithName('crm_customers_edit')
  @Render('pages/customers/edit.njk')
  public async get(@Param() idDto: IdDTO) {
    const customer = await this.queryBus.execute(
      new GetCustomerByIdQuery(idDto.id)
    );

    return {
      customer
    };
  }

  @Post(':id')
  public async post(
    @Param() idDto: IdDTO,
    @Body() dto: CustomerDTO,
    @Res() res: Response
  ) {
    const { name } = dto;

    try {
      await this.commandBus.execute(new UpdateCustomerCommand(idDto.id, name));

      res.redirect(303, this.resolver.resolve('crm_customers_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
