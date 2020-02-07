import {Inject, Injectable} from '@nestjs/common';
import {ISpecification} from 'src/Domain/ISpecification';
import {Activity} from '../Activity.entity';
import {ILoggedUser} from '../../../Application/Adapter/ILoggedUser';

@Injectable()
export class IsActivityDeletable implements ISpecification {
  constructor(
    @Inject('ILoggedUser')
    private readonly loggedUser: ILoggedUser
  ) {}

  public async isSatisfiedBy(activity: Activity): Promise<boolean> {
    return activity.getUser().getId() === (await this.loggedUser.get()).getId();
  }
}
