import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContactView } from 'src/Application/Contact/View/ContactView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetContactsQuery } from 'src/Application/Contact/Query/GetContactsQuery';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { Pagination } from 'src/Application/Common/Pagination';

@Controller('contacts')
@ApiTags('Contact')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetContactsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get all contacts' })
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<ContactView>> {
    return await this.queryBus.execute(new GetContactsQuery(pagination.page));
  }
}
