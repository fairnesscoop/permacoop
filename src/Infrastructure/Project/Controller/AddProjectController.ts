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
import { ProjectDTO } from '../DTO/ProjectDTO';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { CreateProjectCommand } from 'src/Application/Project/Command/CreateProjectCommand';
import { InvoiceUnits } from 'src/Domain/Project/Project.entity';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetCustomersQuery } from 'src/Application/Customer/Query/GetCustomersQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';

@Controller('app/projects/add')
@UseGuards(IsAuthenticatedGuard)
export class AddProjectController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('crm_projects_add')
  @Render('pages/projects/add.njk')
  public async get() {
    const customers: Pagination<CustomerView> = await this.queryBus.execute(
      new GetCustomersQuery(1)
    );

    return {
      active: true,
      customers: customers.items
    };
  }

  @Post()
  public async poqr(@Body() projectDto: ProjectDTO, @Res() res: Response) {
    const { name, customerId, active } = projectDto;

    try {
      await this.commandBus.execute(
        new CreateProjectCommand(name, InvoiceUnits.DAY, active, customerId)
      );

      res.redirect(303, this.resolver.resolve('crm_projects_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
