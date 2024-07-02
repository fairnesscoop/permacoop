import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Query,
  Render
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { GetProjectsQuery } from 'src/Application/Project/Query/GetProjectsQuery';
import { ProjectTableFactory } from '../Table/ProjectTableFactory';
import { Pagination } from 'src/Application/Common/Pagination';
import { ProjectView } from 'src/Application/Project/View/ProjectView';

@Controller('app/projects')
@UseGuards(IsAuthenticatedGuard)
export class ListProjectsController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private tableFactory: ProjectTableFactory
  ) {}

  @Get()
  @WithName('crm_projects_list')
  @Render('pages/projects/list.njk')
  public async get(@Query() paginationDto: PaginationDTO) {
    const pagination: Pagination<ProjectView> = await this.queryBus.execute(
      new GetProjectsQuery(paginationDto.page, false)
    );

    const table = this.tableFactory.create(pagination.items);

    return { table, pagination, currentPage: paginationDto.page };
  }
}
