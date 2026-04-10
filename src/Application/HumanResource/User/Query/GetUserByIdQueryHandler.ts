import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { UserView } from '../View/UserView';
import { GetUserByIdQuery } from './GetUserByIdQuery';

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
      user.isAdministrativeEditable(),
    );
  }
}
