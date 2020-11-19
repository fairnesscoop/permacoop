import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserAdministrative} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import {IUserAdministrativeRepository} from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';

@Injectable()
export class UserAdministrativeRepository
  implements IUserAdministrativeRepository {
  constructor(
    @InjectRepository(UserAdministrative)
    private readonly repository: Repository<UserAdministrative>
  ) {}

  public findOneByUserId(userId: string): Promise<UserAdministrative | undefined> {
    return this.repository
      .createQueryBuilder('userAdministrative')
      .select([
        'userAdministrative.id',
        'userAdministrative.joiningDate',
        'userAdministrative.leavingDate',
        'userAdministrative.annualEarnings',
        'userAdministrative.transportFee',
        'userAdministrative.healthInsurance',
        'userAdministrative.executivePosition',
        'userAdministrative.contract',
      ])
      .innerJoin('userAdministrative.user', 'user')
      .where('user.id = :userId', {userId})
      .getOne();
  }

  public save(
    userAdministrative: UserAdministrative
  ): Promise<UserAdministrative> {
    return this.repository.save(userAdministrative);
  }
}
