import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { IsAuthenticatedGuard } from '../Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import {
  ContractType,
  UserAdministrative,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { GetUserAdministrativeByIdQuery } from 'src/Application/HumanResource/User/Query/GetUserAdministrativeByIdQuery';
import {
  CreateUserCommand,
  IUserAdministrativeCommand
} from 'src/Application/HumanResource/User/Command/CreateUserCommand';
import { UserDTO } from '../DTO/UserDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: User')
@Controller('app/people/users/add')
@UseGuards(IsAuthenticatedGuard)
export class AddUserController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('people_users_add')
  @Render('pages/users/add.njk')
  public async get() {
    const roles = Object.values(UserRole);
    const contracts = Object.values(ContractType);
    const workingTimes = Object.values(WorkingTimeType);

    return { roles, contracts, workingTimes };
  }

  @Post()
  public async post(@Body() userDto: UserDTO, @Res() res: Response) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        role,
        ...userAdministrative
      } = userDto;

      await this.commandBus.execute(
        new CreateUserCommand(
          firstName,
          lastName,
          email,
          password,
          role,
          userAdministrative
        )
      );

      res.redirect(303, this.resolver.resolve('people_users_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
