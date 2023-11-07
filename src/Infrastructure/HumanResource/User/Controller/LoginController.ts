import { Controller, Get, Post, Render, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from '../Security/LocalAuthGuard';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';

@Controller('login')
export class LoginController {
  constructor(private readonly resolver: RouteNameResolver) {}

  @Get()
  @Render('pages/login.njk')
  public get() {
    return {};
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  public async post(@Res() res: Response) {
    res.redirect(303, this.resolver.resolve('home'));
  }
}