import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IQueryBus } from 'src/Application/IQueryBus';
import { UpdateUserCommand } from 'src/Application/HumanResource/User/Command/UpdateUserCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { UserAdministrativeDTO } from '../DTO/UserAdministrativeDTO';
import { IsAuthenticatedGuard } from '../Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { GetUserByIdQuery } from 'src/Application/HumanResource/User/Query/GetUserByIdQuery';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import {
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { GetUserAdministrativeByIdQuery } from 'src/Application/HumanResource/User/Query/GetUserAdministrativeByIdQuery';

@Controller('app/people/users')
@UseGuards(IsAuthenticatedGuard)
export class EditUserController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get(':id')
  @WithName('people_users_edit')
  @Render('pages/users/edit.njk')
  public async get(@Param() dto: IdDTO) {
    const user = await this.queryBus.execute(
      new GetUserAdministrativeByIdQuery(dto.id)
    );
    const roles = Object.values(UserRole);
    const contracts = Object.values(ContractType);
    const workingTimes = Object.values(WorkingTimeType);

    return { user, roles, contracts, workingTimes };
  }

  @Post(':id')
  public async post(
    @Param() dto: IdDTO,
    @Body() userAdministrativeDto: UserAdministrativeDTO,
    @Res() res: Response
  ) {
    const {
      role,
      annualEarnings,
      contract,
      workingTime,
      executivePosition,
      healthInsurance,
      joiningDate,
      leavingDate,
      transportFee,
      sustainableMobilityFee
    } = userAdministrativeDto;

    try {
      await this.commandBus.execute(
        new UpdateUserCommand(
          dto.id,
          role,
          annualEarnings,
          contract,
          workingTime,
          executivePosition,
          healthInsurance,
          joiningDate,
          leavingDate ? leavingDate : null,
          transportFee,
          sustainableMobilityFee
        )
      );

      res.redirect(303, this.resolver.resolve('people_users_list'));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
