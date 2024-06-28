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
import { Pagination } from 'src/Application/Common/Pagination';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { LeaveRequestTableFactory } from '../Table/LeaveRequestTableFactory';
import { LeaveRequestsOverviewTableFactory } from '../Table/LeaveRequestOverviewTableFactory';
import { GetLeaveRequestsOverviewQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsOverviewQuery';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { GetUsersQuery } from 'src/Application/HumanResource/User/Query/GetUsersQuery';
import { ListLeaveRequestsControllerDTO } from '../DTO/ListLeaveRequestsControllerDTO';

@Controller('app/people/leave_requests')
@UseGuards(IsAuthenticatedGuard)
export class ListLeaveRequestsController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: LeaveRequestTableFactory,
    private readonly overviewTableFactory: LeaveRequestsOverviewTableFactory
  ) {}

  @Get()
  @WithName('people_leave_requests_list')
  @Render('pages/leave_requests/list.njk')
  public async get(
    @Query() dto: ListLeaveRequestsControllerDTO,
    @LoggedUser() user: User
  ) {
    const pagination: Pagination<LeaveRequestView> = await this.queryBus.execute(
      new GetLeaveRequestsQuery(user.getId(), dto.page)
    );

    const table = this.tableFactory.create(pagination.items, user.getId());

    const userId = dto.userId ? dto.userId : user['id'];

    const overview = await this.queryBus.execute(
      new GetLeaveRequestsOverviewQuery(new Date(), userId)
    );
    const overviewTable = await this.overviewTableFactory.create(
      overview,
      userId
    );

    return {
      table,
      overviewTable,
      pagination,
      currentPage: dto.page
    };
  }
}
