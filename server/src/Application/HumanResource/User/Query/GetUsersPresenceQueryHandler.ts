import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUsersPresenceQuery } from './GetUsersPresenceQuery';
import { UserView } from '../View/UserView';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { IDateUtils } from 'src/Application/IDateUtils';
import { UserPresenceView } from '../View/UserPresenceView';

@QueryHandler(GetUsersPresenceQuery)
export class GetUsersPresenceQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute(query: GetUsersPresenceQuery): Promise<UserPresenceView[]> {
    const currentDate = this.dateUtils.getCurrentDate();
    const workedDays = this.dateUtils.getWorkedDaysDuringAPeriod(currentDate, currentDate);
    const usersPresenceView: UserPresenceView[] = [];

    if (0 === workedDays.length) {
      return usersPresenceView;
    }

    const tst = await this.userRepository.findUsersPresences(currentDate);
    
    console.log(tst);

    

    return usersPresenceView;
  }
}
