import {
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from '../Security/LocalAuthGuard';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: Authentication')
@Controller('login')
export class LoginController {
  constructor(private readonly resolver: RouteNameResolver) {}

  @Get()
  @WithName('login')
  @Render('pages/login.njk')
  public get(@Query('next') next = null, @Res() res: Response) {
    if (next) {
      res.locals.flash('error', 'login-error-auth-required');
    }
    return { next };
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  public async post(@Query('next') next = null, @Res() res: Response) {
    const redirectUrl = next || this.resolver.resolve('home');
    res.redirect(303, redirectUrl);
  }
}
