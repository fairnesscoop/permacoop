import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {LoginQuery} from './LoginQuery';
import {AuthenticatedView} from '../View/AuthenticatedView';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryption} from 'src/Application/IEncryption';
import {PasswordNotMatchException} from 'src/Domain/User/Exception/PasswordNotMatchException';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';

@QueryHandler(LoginQuery)
export class LoginQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryption')
    private readonly encryption: IEncryption
  ) {}

  public async execute(query: LoginQuery): Promise<AuthenticatedView> {
    const {password} = query;
    const email = query.email.toLowerCase();
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (
      false === (await this.encryption.compare(user.getPassword(), password))
    ) {
      throw new PasswordNotMatchException();
    }

    return new AuthenticatedView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getRole(),
      user.getApiToken()
    );
  }
}
