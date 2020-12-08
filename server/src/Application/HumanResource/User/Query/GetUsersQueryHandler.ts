import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUsersQuery } from './GetUsersQuery';
import { UserView } from '../View/UserView';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { Pagination } from 'src/Application/Common/Pagination';
import { UserAdministrativeView } from '../View/UserAdministrativeView';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async execute({ page }: GetUsersQuery): Promise<Pagination<UserView>> {
    const [ users, total ] = await this.userRepository.findUsers(page);
    const userViews: UserView[] = [];

    for (const user of users) {
      const userAdmin = user.getUserAdministrative();

      userViews.push(
        new UserView(
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
              '',
              userAdmin.getTransportFee() * 0.01
            )
          : null
        )
      );
    }

    return new Pagination<UserView>(userViews, total);
  }
}
