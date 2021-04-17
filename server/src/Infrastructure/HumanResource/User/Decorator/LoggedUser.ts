import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export const LoggedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  }
);
