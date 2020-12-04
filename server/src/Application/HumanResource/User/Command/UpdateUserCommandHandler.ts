import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import { UserAdministrativeMissingException } from 'src/Domain/HumanResource/User/Exception/UserAdministrativeMissingException';
import {UserNotFoundException} from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import {IUserAdministrativeRepository} from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';
import {IUserRepository} from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import {UpdateUserCommand} from './UpdateUserCommand';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserAdministrativeRepository')
    private readonly userAdministrativeRepository: IUserAdministrativeRepository
  ) {}

  public async execute(command: UpdateUserCommand): Promise<void> {
    const {
      id,
      role,
      annualEarnings,
      contract,
      executivePosition,
      healthInsurance,
      joiningDate,
      leavingDate,
      transportFee
    } = command;

    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }

    const userAdministrative = await this.userAdministrativeRepository.findOneByUserId(id);

    if (!userAdministrative) {
      throw new UserAdministrativeMissingException();
    }

    user.updateRole(role);
    userAdministrative.update(
      Math.round(annualEarnings * 100),
      contract,
      executivePosition,
      healthInsurance,
      joiningDate,
      leavingDate,
      transportFee ? Math.round(transportFee * 100) : 0
    );

    await this.userRepository.save(user);
    await this.userAdministrativeRepository.save(userAdministrative);
  }
}
