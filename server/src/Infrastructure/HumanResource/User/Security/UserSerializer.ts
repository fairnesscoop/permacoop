import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthenticatedView } from 'src/Application/HumanResource/User/View/AuthenticatedView';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  serializeUser(user: AuthenticatedView, done: Function) {
    done(null, user);
  }

  public async deserializeUser(
    view: AuthenticatedView,
    done: Function
  ): Promise<void> {
    const user = await this.userRepository.findOneById(view.id);

    done(null, user);
  }
}
