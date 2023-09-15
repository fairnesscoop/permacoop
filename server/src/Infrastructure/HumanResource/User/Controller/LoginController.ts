import { Controller, Get, Post, Render, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('')
export class LoginController {
  @Get()
  @Render('login')
  public get() {
    return {};
  }

  @Post()
  @Render('login')
  public async post(@Req() req: Request) {
    return {};
  }
}
