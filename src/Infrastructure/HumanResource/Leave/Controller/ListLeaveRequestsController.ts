import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Render,
  Query
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { GetLeaveRequestsQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsQuery';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { Pagination } from 'src/Application/Common/Pagination';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { LeaveRequestTableFactory } from '../Table/LeaveRequestTableFactory';

@Controller('app/people/leave_requests')
@UseGuards(IsAuthenticatedGuard)
export class ListLeaveRequestsController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: LeaveRequestTableFactory
  ) {}

  @Get()
  @WithName('people_leave_requests_list')
  @Render('pages/leave_requests/list.njk')
  public async get(
    @Query() paginationDto: PaginationDTO,
    @LoggedUser() user: User
  ) {
    const pagination: Pagination<LeaveRequestView> = await this.queryBus.execute(
      new GetLeaveRequestsQuery(user.getId(), paginationDto.page)
    );

    const table = this.tableFactory.create(pagination.items, user.getId());

    return { table, pagination, currentPage: paginationDto.page };
  }
}
