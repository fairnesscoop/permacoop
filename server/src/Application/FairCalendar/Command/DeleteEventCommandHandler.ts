import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IEventRepository} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import {DeleteEventCommand} from './DeleteEventCommand';
import {EventDoesntBelongToUserException} from 'src/Domain/FairCalendar/Exception/EventDoesntBelongToUserException';
import {EventNotFoundException} from 'src/Domain/FairCalendar/Exception/EventNotFoundException';
import {DoesEventBelongToUser} from 'src/Domain/FairCalendar/Specification/DoesEventBelongToUser';

@CommandHandler(DeleteEventCommand)
export class DeleteEventCommandHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    private readonly doesEventBelongToUser: DoesEventBelongToUser
  ) {}

  public async execute(command: DeleteEventCommand): Promise<void> {
    const {id, user} = command;
    const event = await this.eventRepository.findOneById(id);

    if (!event) {
      throw new EventNotFoundException();
    }

    if (false === this.doesEventBelongToUser.isSatisfiedBy(event, user)) {
      throw new EventDoesntBelongToUserException();
    }

    this.eventRepository.delete(event);
  }
}
