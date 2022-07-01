import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { GetLeaveRequestsQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestsQuery';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { Pagination } from 'src/Application/Common/Pagination';
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { LoggedUser } from '../../User/Decorator/LoggedUser';

@Controller('leaves')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetLeavesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get all leaves' })
  public async index(
    @Query() pagination: PaginationDTO,
    @LoggedUser() user: User
  ): Promise<Pagination<LeaveRequestView>> {
    return await this.queryBus.execute(
      new GetLeaveRequestsQuery(user.getId(), pagination.page, Status.ACCEPTED)
    );
  }
}
