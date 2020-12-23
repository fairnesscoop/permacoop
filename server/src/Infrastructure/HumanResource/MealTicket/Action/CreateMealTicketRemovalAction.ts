import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBus } from 'src/Application/ICommandBus';
import { MealTicketRemovalDTO } from '../DTO/MealTicketRemovalDTO';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { CreateMealTicketRemovalCommand } from 'src/Application/HumanResource/MealTicket/Command/CreateMealTicketRemovalCommand';

@Controller('meal-tickets-removals')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateMealTicketRemovalAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Create new meal ticket removal'})
  public async index(
    @Body() { date, comment }: MealTicketRemovalDTO,
    @LoggedUser() user: User
  ) {
    try {
      const id = await this.commandBus.execute(
        new CreateMealTicketRemovalCommand(date, comment, user)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
