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
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { IncreaseUserSavingsRecordCommand } from 'src/Application/HumanResource/Savings/Command/IncreaseUserSavingsRecordCommand';
import { UserSavingsRecordDTO } from '../DTO/UserSavingsRecordDTO';

@Controller('users/savings-records')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class IncreaseUserSavingsRecordAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post('increase')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Increase user savings record' })
  public async index(
    @Body() { userId, amount }: UserSavingsRecordDTO,
  ) {
    try {
      const id = await this.commandBus.execute(
        new IncreaseUserSavingsRecordCommand(amount, userId)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
