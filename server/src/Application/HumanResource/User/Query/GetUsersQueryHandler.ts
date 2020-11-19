import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetUsersQuery} from './GetUsersQuery';
import {UserView} from '../View/UserView';
import {IUserRepository} from 'src/Domain/HumanResource/User/Repository/IUserRepository';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(query: GetUsersQuery): Promise<UserView[]> {
    const users = await this.userRepository.findUsers(query.withAccountant);
    const userViews: UserView[] = [];

    for (const user of users) {
      userViews.push(
        new UserView(
          user.getId(),
          user.getFirstName(),
          user.getLastName(),
          user.getEmail(),
          user.getRole(),
          user.isAdministrativeEditable()
        )
      );
    }

    return userViews;
  }
}
