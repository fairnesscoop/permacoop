import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetEventByIdQuery } from 'src/Application/FairCalendar/Query/GetEventByIdQuery';
import { EventView } from 'src/Application/FairCalendar/View/EventView';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('events')
@ApiTags('FairCalendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetEventAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get event' })
  public async index(@Param() dto: IdDTO): Promise<EventView> {
    try {
      return await this.queryBus.execute(new GetEventByIdQuery(dto.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
