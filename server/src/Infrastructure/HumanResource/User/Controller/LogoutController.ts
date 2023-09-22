import {
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';

@Controller('logout')
export class LogoutController {
  @Post()
  @WithName('logout')
  public async post(@Req() req: Request, @Res() res: Response): Promise<void> {
    const err = await new Promise(resolve => {
      req.logout(err => resolve(err));
    });

    if (err) {
      throw new InternalServerErrorException('Failed to log out');
    }

    res.redirect(303, '/login');
  }
}
