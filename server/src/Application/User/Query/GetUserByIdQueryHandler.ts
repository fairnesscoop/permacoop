import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UserView} from '../View/UserView';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {GetUserByIdQuery} from './GetUserByIdQuery';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(query: GetUserByIdQuery): Promise<UserView> {
    const user = await this.userRepository.findOneById(query.id);
    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getRole(),
      user.getEntryDate()
    );
  }
}
