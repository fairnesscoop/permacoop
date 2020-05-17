import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {DailyRateView} from 'src/Application/Accounting/View/DailyRate/DailyRateView';
import {GetQuotesQuery} from 'src/Application/Accounting/Query/Quote/GetQuotesQuery';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {PaginationDTO} from 'src/Infrastructure/Common/DTO/PaginationDTO';
import {Pagination} from 'src/Application/Common/Pagination';

@Controller('quotes')
@ApiUseTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetQuotesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get all quotes'})
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<DailyRateView>> {
    return await this.queryBus.execute(
      new GetQuotesQuery(Number(pagination.page))
    );
  }
}
