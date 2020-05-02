import {createParamDecorator} from '@nestjs/common';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export const LoggedUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  }
);
