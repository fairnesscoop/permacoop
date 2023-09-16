import { Controller, Get, Post, Render, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from '../Security/LocalAuthGuard';

@Controller('login')
export class LoginController {
  @Get()
  @Render('pages/login')
  public get() {
    return {};
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  public async post(@Res() res: Response) {
    res.redirect(303, '/');
  }
}
