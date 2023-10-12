import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';

// TODO remove
@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  public async validate(token: string): Promise<User> {
    const user = await this.userRepository.findOneByApiToken(token);

    if (!(user instanceof User)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
