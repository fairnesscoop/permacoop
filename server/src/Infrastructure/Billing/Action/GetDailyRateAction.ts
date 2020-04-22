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
import {DailyRateView} from 'src/Application/Billing/View/DailyRate/DailyRateView';
import {GetDailyRateByIdQuery} from 'src/Application/Billing/Query/DailyRate/GetDailyRateByIdQuery';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('daily_rates')
@ApiUseTags('Billing')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetDailyRateAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @ApiOperation({title: 'Get daily rate'})
  public async index(@Param() dto: IdDTO): Promise<DailyRateView> {
    try {
      return await this.queryBus.execute(new GetDailyRateByIdQuery(dto.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
