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
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { GetLeaveRequestsQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsQuery';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { LeaveTableFactory } from '../Table/LeaveTableFactory';
import { Pagination } from 'src/Application/Common/Pagination';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';

@Controller('app/people/leaves')
@UseGuards(IsAuthenticatedGuard)
export class ListLeavesController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: LeaveTableFactory
  ) {}

  @Get()
  @WithName('people_leaves_list')
  @Render('pages/leaves/list.njk')
  public async get(
    @Query() pagination: PaginationDTO,
    @LoggedUser() user: User
  ) {
    const leaves: Pagination<LeaveRequestView> = await this.queryBus.execute(
      new GetLeaveRequestsQuery(user.getId(), pagination.page, Status.ACCEPTED)
    );

    const table = this.tableFactory.create(leaves.items);

    return { table };
  }
}
