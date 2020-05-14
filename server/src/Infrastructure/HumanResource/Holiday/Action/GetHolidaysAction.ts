import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {HolidayView} from 'src/Application/HumanResource/Holiday/View/HolidayView';
import {GetHolidaysQuery} from 'src/Application/HumanResource/Holiday/Query/GetHolidaysQuery';

@Controller('holidays')
@ApiUseTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetHolidaysAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get all holidays'})
  public async index(): Promise<HolidayView[]> {
    return await this.queryBus.execute(new GetHolidaysQuery());
  }
}
