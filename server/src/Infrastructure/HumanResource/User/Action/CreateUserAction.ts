import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {CreateUserCommand} from 'src/Application/HumanResource/User/Command/CreateUserCommand';
import {UserView} from 'src/Application/HumanResource/User/View/UserView';
import {UserDTO} from '../DTO/UserDTO';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetUserByIdQuery} from 'src/Application/HumanResource/User/Query/GetUserByIdQuery';
import {Roles} from '../Decorator/Roles';
import {RolesGuard} from '../Security/RolesGuard';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateUserAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({title: 'Create new user account'})
  public async index(@Body() userDto: UserDTO): Promise<UserView> {
    try {
      const {firstName, lastName, email, password, entryDate, role} = userDto;
      const id = await this.commandBus.execute(
        new CreateUserCommand(
          firstName,
          lastName,
          email,
          password,
          role,
          entryDate ? new Date(entryDate) : null
        )
      );

      return await this.queryBus.execute(new GetUserByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
