import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { LoggedUser } from '../Decorator/LoggedUser';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { IsAuthenticatedGuard } from '../Security/IsAuthenticatedGuard';
import { ICommandBus } from 'src/Application/ICommandBus';
import { ProfileDTO } from '../DTO/ProfileDTO';
import { UpdateProfileCommand } from 'src/Application/HumanResource/User/Command/UpdateProfileCommand';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Response } from 'express';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: User')
@Controller('app/profile/edit')
@UseGuards(IsAuthenticatedGuard)
export class EditProfileController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('profile_edit')
  @Render('pages/profile/edit.njk')
  public async get(@LoggedUser() user: User) {
    const me = new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getRole(),
      false
    );

    return { user: me };
  }

  @Post()
  public async post(
    @Body() dto: ProfileDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    try {
      const { firstName, lastName, email, password } = dto;
      await this.commandBus.execute(
        new UpdateProfileCommand(user, firstName, lastName, email, password)
      );

      res.redirect(303, this.resolver.resolve('home'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
