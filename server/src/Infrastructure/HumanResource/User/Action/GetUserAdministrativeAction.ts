import {Controller, Get, Inject, Param, UseGuards, NotFoundException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Roles} from '../Decorator/Roles';
import {IQueryBus} from '@nestjs/cqrs';
import {UserAdministrativeView} from 'src/Application/HumanResource/User/View/UserAdministrativeView';
import {GetUserAdministrativeByIdQuery} from 'src/Application/HumanResource/User/Query/GetUserAdministrativeByIdQuery';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('users')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUserAdministrativeAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({summary: 'Get user'})
  public async index(@Param() dto: IdDTO): Promise<UserAdministrativeView> {
    try {
      return await this.queryBus.execute(new GetUserAdministrativeByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
