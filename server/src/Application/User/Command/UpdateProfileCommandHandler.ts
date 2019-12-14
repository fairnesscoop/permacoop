import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {UserView} from '../View/UserView';
import {UpdateProfileCommand} from './UpdateProfileCommand';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: UpdateProfileCommand): Promise<UserView> {
    const {firstName, lastName, password, user} = command;
    const email = command.email.toLowerCase();

    if (
      email !== user.getEmail() &&
      true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))
    ) {
      throw new EmailAlreadyExistException();
    }

    user.update(firstName, lastName, email);

    if (password) {
      user.updatePassword(await this.encryptionAdapter.hash(password));
    }

    await this.userRepository.save(user);

    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail()
    );
  }
}
