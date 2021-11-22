import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  CreateUserCommand,
  IUserAdministrativeCommand
} from './CreateUserCommand';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { IsEmailAlreadyExist } from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import { EmailAlreadyExistException } from 'src/Domain/HumanResource/User/Exception/EmailAlreadyExistException';
import { IUserAdministrativeRepository } from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';
import { UserAdministrativeMissingException } from 'src/Domain/HumanResource/User/Exception/UserAdministrativeMissingException';
import { UserAdministrative } from 'src/Domain/HumanResource/User/UserAdministrative.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserAdministrativeRepository')
    private readonly userAdministrativeRepository: IUserAdministrativeRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: CreateUserCommand): Promise<string> {
    const { firstName, lastName, password, role, userAdministrative } = command;
    const email = command.email.toLowerCase();

    if (true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))) {
      throw new EmailAlreadyExistException();
    }

    if (UserRole.ACCOUNTANT !== role && !userAdministrative) {
      throw new UserAdministrativeMissingException();
    }

    const userAdmin = await this.createUserAdministrative(
      role,
      userAdministrative
    );

    const hashPassword = await this.passwordEncoder.hash(password);
    const apiToken = await this.passwordEncoder.hash(email + password);
    const user = await this.userRepository.save(
      new User(
        firstName,
        lastName,
        email,
        apiToken,
        hashPassword,
        role,
        userAdmin
      )
    );

    return user.getId();
  }

  private async createUserAdministrative(
    role: UserRole,
    userAdministrative?: IUserAdministrativeCommand
  ): Promise<UserAdministrative | null> {
    if (role === UserRole.ACCOUNTANT) {
      return null;
    }

    const {
      annualEarnings,
      contract,
      workingTime,
      executivePosition,
      healthInsurance,
      joiningDate,
      leavingDate,
      transportFee
    } = userAdministrative;

    return await this.userAdministrativeRepository.save(
      new UserAdministrative(
        Math.round(annualEarnings * 100),
        healthInsurance,
        executivePosition,
        contract,
        workingTime,
        joiningDate,
        leavingDate,
        transportFee ? Math.round(transportFee * 100) : 0
      )
    );
  }
}
