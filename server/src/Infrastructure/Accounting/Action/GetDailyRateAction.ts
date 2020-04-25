import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Get
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {DailyRateView} from 'src/Application/Accounting/View/DailyRate/DailyRateView';
import {GetDailyRateByIdQuery} from 'src/Application/Accounting/Query/DailyRate/GetDailyRateByIdQuery';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {UserRole} from 'src/Domain/User/User.entity';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('daily_rates')
@ApiUseTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetDailyRateAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get daily rate'})
  public async index(@Param() dto: IdDTO): Promise<DailyRateView> {
    try {
      return await this.queryBus.execute(new GetDailyRateByIdQuery(dto.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
