import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryption} from 'src/Application/IEncryption';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {UpdateProfileCommand} from './UpdateProfileCommand';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryption')
    private readonly encryption: IEncryption,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: UpdateProfileCommand): Promise<void> {
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
      user.updatePassword(await this.encryption.hash(password));
    }

    await this.userRepository.save(user);
  }
}
