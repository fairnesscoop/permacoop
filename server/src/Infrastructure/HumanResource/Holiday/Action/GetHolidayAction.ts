import {Controller, Inject, UseGuards, Get, Query, Param} from '@nestjs/common';
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
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('holidays')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetHolidaysAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get holiday request detail'})
  public async index(
    @Param() dto: IdDTO
  ): Promise<HolidayView> {
    return await this.queryBus.execute(
      new GetHolidayByIdQuery(dto.id)
    );
  }
}
