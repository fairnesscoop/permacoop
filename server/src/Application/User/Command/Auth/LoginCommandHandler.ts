import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {LoginCommand} from './LoginCommand';
import {AuthenticatedView} from '../../View/Auth/AuthenticatedView';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';
import {User} from 'src/Domain/User/User.entity';
import {PasswordNotMatchException} from 'src/Domain/User/Exception/PasswordNotMatchException';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';

@CommandHandler(LoginCommand)
export class LoginCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter
  ) {}

  public async execute(command: LoginCommand): Promise<AuthenticatedView> {
    const {email, password} = command;
    const user = await this.userRepository.findOneByEmail(email);

    if (!(user instanceof User)) {
      throw new UserNotFoundException();
    }

    if (
      false === (await this.encryptionAdapter.compare(user.password, password))
    ) {
      throw new PasswordNotMatchException();
    }

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      user.apiToken
    );
  }
}
