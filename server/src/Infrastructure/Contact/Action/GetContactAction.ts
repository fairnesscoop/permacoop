import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContactView } from 'src/Application/Contact/View/ContactView';
import { GetContactByIdQuery } from 'src/Application/Contact/Query/GetContactByIdQuery';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('contacts')
@ApiTags('Contact')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetContactAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get contact' })
  public async index(@Param() dto: IdDTO): Promise<ContactView> {
    try {
      return await this.queryBus.execute(new GetContactByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
