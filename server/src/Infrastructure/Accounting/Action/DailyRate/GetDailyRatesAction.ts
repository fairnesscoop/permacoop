import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {DailyRateView} from 'src/Application/Accounting/View/DailyRate/DailyRateView';
import {GetDailyRatesQuery} from 'src/Application/Accounting/Query/DailyRate/GetDailyRatesQuery';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {PaginationDTO} from 'src/Infrastructure/Common/DTO/PaginationDTO';
import {Pagination} from 'src/Application/Common/Pagination';

@Controller('daily_rates')
@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetDailyRatesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get all daily rates'})
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<DailyRateView>> {
    return await this.queryBus.execute(
      new GetDailyRatesQuery(pagination.page)
    );
  }
}
