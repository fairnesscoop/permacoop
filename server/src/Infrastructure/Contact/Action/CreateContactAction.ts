import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { ContactDTO } from '../DTO/ContactDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { CreateContactCommand } from 'src/Application/Contact/Command/CreateContactCommand';

@Controller('contacts')
@ApiTags('Contact')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateContactAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Create new contact' })
  public async index(@Body() contactDto: ContactDTO) {
    const {
      firstName,
      lastName,
      company,
      email,
      phoneNumber,
      notes
    } = contactDto;

    try {
      const id = await this.commandBus.execute(
        new CreateContactCommand(
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
