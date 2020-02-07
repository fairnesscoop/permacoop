import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {DeleteActivityCommand} from './DeleteActivityCommand';
import {ActivityNotFoundException} from '../../../Domain/Activity/Exception/ActivityNotFoundException';
import {Activity} from '../../../Domain/Activity/Activity.entity';
import {NotActivityOwnerException} from '../../../Domain/Activity/Exception/NotActivityOwnerException';
import {IsActivityDeletable} from '../../../Domain/Activity/Specification/IsActivityDeletable';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityCommandHandler {
  constructor(
    private readonly isActivityDeletable: IsActivityDeletable,
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository
  ) {}

  public async execute(command: DeleteActivityCommand): Promise<void> {
    const {activityId} = command;
    const activity = await this.activityRepository.findOneById(activityId);

    if (!(activity instanceof Activity)) {
      throw new ActivityNotFoundException();
    }

    if (false === (await this.isActivityDeletable.isSatisfiedBy(activity))) {
      throw new NotActivityOwnerException();
    }

    return;

    this.activityRepository.deleteById(activityId);
  }
}
