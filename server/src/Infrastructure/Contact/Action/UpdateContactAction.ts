import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateContactCommand } from 'src/Application/Contact/Command/UpdateContactCommand';
import { ContactDTO } from '../DTO/ContactDTO';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';

@Controller('contacts')
@ApiTags('Contact')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateContactAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Update contact' })
  public async index(@Param() dto: IdDTO, @Body() contactDto: ContactDTO) {
    try {
      const { id } = dto;
      const {
        firstName,
        lastName,
        company,
        email,
        phoneNumber,
        notes
      } = contactDto;

      await this.commandBus.execute(
        new UpdateContactCommand(
          id,
          firstName,
          lastName,
          company,
          email,
          phoneNumber,
          notes
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
