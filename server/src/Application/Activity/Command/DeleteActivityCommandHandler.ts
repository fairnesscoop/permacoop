import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IActivityRepository} from 'src/Domain/Activity/Repository/IActivityRepository';
import {DeleteActivityCommand} from './DeleteActivityCommand';
import {ActivityNotFoundException} from '../../../Domain/Activity/Exception/ActivityNotFoundException';
import {Activity} from '../../../Domain/Activity/Activity.entity';
import {NotActivityOwnerException} from '../../../Domain/Activity/Exception/NotActivityOwnerException';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityCommandHandler {
  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository
  ) {}

  public async execute(command: DeleteActivityCommand): Promise<void> {
    const {activityId, user} = command;
    const activity = await this.activityRepository.findOneById(activityId);

    if (!(activity instanceof Activity)) {
      throw new ActivityNotFoundException();
    }

    if (activity.getUser().getId() !== user.getId()) {
      throw new NotActivityOwnerException();
    }

    this.activityRepository.deleteById(activityId);
  }
}
