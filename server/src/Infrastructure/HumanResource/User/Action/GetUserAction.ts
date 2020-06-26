import {Controller, Get, Inject, Param, UseGuards, NotFoundException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserAdministrativeView} from 'src/Application/HumanResource/User/View/UserAdministrativeView';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {Roles} from '../Decorator/Roles';
import {IQueryBus} from '@nestjs/cqrs';
import {GetUserAdministrativeByIdQuery} from 'src/Application/HumanResource/User/Query/GetUserAdministrativeByIdQuery';

@Controller('users')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUserAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/administrative')
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({summary: 'Get user administrative info'})
  public async index(@Param() dto: IdDTO): Promise<UserAdministrativeView> {
    try {
      return await this.queryBus.execute(new GetUserAdministrativeByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
