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

  public async execute(
    query: GetUserByIdQuery
  ): Promise<UserView> {
    const user = await this.userRepository.findOneById(query.id);
    if (!user) {
      throw new UserNotFoundException();
    }
    const userAdministrative = await this.userAdministrativeRepository.findOneByUserId(
      query.id
    );

    let userAdministrativeView: UserAdministrativeView = null;
    if (userAdministrative) {
      userAdministrativeView = new UserAdministrativeView(
        userAdministrative.getAnnualEarnings() * 0.01,
        userAdministrative.getContract(),
        userAdministrative.isExecutivePosition(),
        userAdministrative.haveHealthInsurance(),
        userAdministrative.getJoiningDate(),
        userAdministrative.getLeavingDate(),
        userAdministrative.getTransportFee() * 0.01
      );
    }

    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getRole(),
      user.isAdministrativeEditable(),
      userAdministrativeView
    );
  }
}
