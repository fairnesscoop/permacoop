import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {HolidayNotFoundException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayNotFoundException';
import {IDateUtils} from 'src/Application/IDateUtils';
import {HolidayCantBeModeratedException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayCantBeModeratedException';
import {CanHolidayBeModerated} from 'src/Domain/HumanResource/Holiday/Specification/CanHolidayBeModerated';
import {AcceptHolidayCommand} from './AcceptHolidayCommand';
import {IEventBus} from 'src/Application/IEventBus';
import {AcceptedHolidayEvent} from '../Event/AcceptedHolidayEvent';

@CommandHandler(AcceptHolidayCommand)
export class AcceptHolidayCommandHandler {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canHolidayBeModerated: CanHolidayBeModerated
  ) {}

  public async execute(command: AcceptHolidayCommand): Promise<string> {
    const {moderator, moderationComment, id} = command;

    const holiday = await this.holidayRepository.findOneById(id);
    if (!holiday) {
      throw new HolidayNotFoundException();
    }

    if (
      false === this.canHolidayBeModerated.isSatisfiedBy(holiday, moderator)
    ) {
      throw new HolidayCantBeModeratedException();
    }

    holiday.accept(
      moderator,
      this.dateUtils.getCurrentDateToISOString(),
      moderationComment
    );

    await this.holidayRepository.save(holiday);
    this.eventBus.publish(new AcceptedHolidayEvent(holiday));

    return holiday.getId();
  }
}
