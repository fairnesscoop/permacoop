import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Render,
  Query,
  Param
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { LeaveRequestTableFactory } from '../Table/LeaveRequestTableFactory';
import { GetLeaveRequestByIdQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestByIdQuery';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { CanLeaveRequestBeModerated } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeModerated';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { LeaveRequestDetailView } from 'src/Application/HumanResource/Leave/View/LeaveRequestDetailView';

@Controller('app/people/leaves')
@UseGuards(IsAuthenticatedGuard)
export class GetLeaveRequestController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: LeaveRequestTableFactory,
    private readonly canLeaveRequestBeModerated: CanLeaveRequestBeModerated
  ) {}

  @Get(':id')
  @WithName('people_leave_requests_detail')
  @Render('pages/leave_requests/detail.njk')
  public async get(@Param() { id }: IdDTO, @LoggedUser() user: User) {
    const leaveRequest: LeaveRequestDetailView = await this.queryBus.execute(
      new GetLeaveRequestByIdQuery(id)
    );

    const inline = this.tableFactory.createInline(leaveRequest);

    return {
      leaveRequest,
      inline,
      canModerate: this.canLeaveRequestBeModerated.isSatisfiedBy(
        leaveRequest,
        user
      )
    };
  }
}
