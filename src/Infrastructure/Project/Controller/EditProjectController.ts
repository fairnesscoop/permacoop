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
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { GetProjectByIdQuery } from 'src/Application/Project/Query/GetProjectByIdQuery';
import { ProjectDTO } from '../DTO/ProjectDTO';
import { UpdateProjectCommand } from 'src/Application/Project/Command/UpdateProjectCommand';
import { InvoiceUnits } from 'src/Domain/Project/Project.entity';
import { GetCustomersQuery } from 'src/Application/Customer/Query/GetCustomersQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';

@Controller('app/projects/edit')
@UseGuards(IsAuthenticatedGuard)
export class EditProjectController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get(':id')
  @WithName('crm_projects_edit')
  @Render('pages/projects/edit.njk')
  public async get(@Param() idDto: IdDTO) {
    const project = await this.queryBus.execute(
      new GetProjectByIdQuery(idDto.id)
    );

    const customers: Pagination<CustomerView> = await this.queryBus.execute(
      new GetCustomersQuery(1)
    );

    return {
      project,
      customers: customers.items
    };
  }

  @Post(':id')
  public async post(
    @Param() idDto: IdDTO,
    @Body() dto: ProjectDTO,
    @Res() res: Response
  ) {
    const { name, customerId, active } = dto;

    try {
      await this.commandBus.execute(
        new UpdateProjectCommand(
          idDto.id,
          name,
          InvoiceUnits.DAY,
          active,
          customerId
        )
      );

      res.redirect(303, this.resolver.resolve('crm_projects_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
