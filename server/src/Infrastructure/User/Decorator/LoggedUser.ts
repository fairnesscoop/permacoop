import {createParamDecorator} from '@nestjs/common';
import {User} from 'src/Domain/User/User.entity';

export const LoggedUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  }
);
