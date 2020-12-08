import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { IUserAdministrativeRepository } from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { UserAdministrativeView } from '../View/UserAdministrativeView';
import { UserView } from '../View/UserView';
import { GetUserAdministrativeByIdQuery } from './GetUserAdministrativeByIdQuery';
import { GetUserByIdQuery } from './GetUserByIdQuery';

@QueryHandler(GetUserAdministrativeByIdQuery)
export class GetUserAdministrativeByIdQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserAdministrativeRepository')
    private readonly userAdministrativeRepository: IUserAdministrativeRepository
  ) {}

  public async execute({ id }: GetUserByIdQuery): Promise<UserView> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }

    const userAdmin = await this.userAdministrativeRepository.findOneByUserId(id);

    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getRole(),
      userAdmin ?
        new UserAdministrativeView(
          userAdmin.getAnnualEarnings() * 0.01,
          userAdmin.getContract(),
          userAdmin.isExecutivePosition(),
          userAdmin.haveHealthInsurance(),
          userAdmin.getJoiningDate(),
          userAdmin.getLeavingDate(),
          userAdmin.getTransportFee() * 0.01
        )
      : null
    );
  }
}
