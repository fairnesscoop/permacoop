import {
  Controller,
  Inject,
  UseGuards,
  Get,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetCooperativeQuery } from 'src/Application/Settings/Query/GetCooperativeQuery';
import { CooperativeView } from 'src/Application/Settings/View/CooperativeView';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('settings')
@ApiTags('Settings')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetCooperativeAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('cooperative')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get cooperative settings' })
  public async index(): Promise<CooperativeView> {
    try {
      return await this.queryBus.execute(new GetCooperativeQuery());
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
