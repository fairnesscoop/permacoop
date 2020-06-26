import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IUserRepository} from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import {GetUserByIdQuery} from './GetUserByIdQuery';
import {UserNotFoundException} from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import {UserAdministrativeView} from '../View/UserAdministrativeView';
import {IUserAdministrativeRepository} from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';
import {GetUserAdministrativeByIdQuery} from './GetUserAdministrativeByIdQuery';

@QueryHandler(GetUserAdministrativeByIdQuery)
export class GetUserAdministrativeByIdQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserAdministrativeRepository')
    private readonly userAdministrativeRepository: IUserAdministrativeRepository
  ) {}

  public async execute(query: GetUserByIdQuery): Promise<UserAdministrativeView> {
    const user = await this.userRepository.findOneById(query.id);
    if (!user) {
      throw new UserNotFoundException();
    }
    const userAdministrative = await this.userAdministrativeRepository.findOneByUserId(query.id);

    return new UserAdministrativeView(
      user.getFirstName(),
      user.getLastName(),
      user.getRole(),
      userAdministrative.getAnnualEarnings(),
      userAdministrative.getContract(),
      userAdministrative.isExecutivePosition(),
      userAdministrative.haveHealthInsurance(),
      userAdministrative.getJoiningDate(),
      userAdministrative.getLeavingDate(),
      userAdministrative.getTransportFee()
    );
  }
}
