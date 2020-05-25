import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {HolidayView} from 'src/Application/HumanResource/Holiday/View/HolidayView';
import {GetHolidaysQuery} from 'src/Application/HumanResource/Holiday/Query/GetHolidaysQuery';
import {PaginationDTO} from 'src/Infrastructure/Common/DTO/PaginationDTO';
import {Pagination} from 'src/Application/Common/Pagination';

@Controller('holidays')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetHolidaysAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get all holidays'})
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<HolidayView>> {
    return await this.queryBus.execute(
      new GetHolidaysQuery(Number(pagination.page))
    );
  }
}
