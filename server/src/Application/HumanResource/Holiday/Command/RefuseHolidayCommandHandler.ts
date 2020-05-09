import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {RefuseHolidayCommand} from './RefuseHolidayCommand';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {HolidayNotFoundException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayNotFoundException';
import {IDateUtils} from 'src/Application/IDateUtils';
import {HolidayCantBeModeratedException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayCantBeModeratedException';
import {CanHolidayBeModerated} from 'src/Domain/HumanResource/Holiday/Specification/CanHolidayBeModerated';

@CommandHandler(RefuseHolidayCommand)
export class RefuseHolidayCommandHandler {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canHolidayBeModerated: CanHolidayBeModerated
  ) {}

  public async execute(command: RefuseHolidayCommand): Promise<string> {
    const {moderator, id, moderationComment} = command;

    const holiday = await this.holidayRepository.findOneById(id);
    if (!holiday) {
      throw new HolidayNotFoundException();
    }

    if (
      false === this.canHolidayBeModerated.isSatisfiedBy(holiday, moderator)
    ) {
      throw new HolidayCantBeModeratedException();
    }

    holiday.refuse(
      moderator,
      this.dateUtils.getCurrentDateToISOString(),
      moderationComment
    );
    await this.holidayRepository.save(holiday);

    return holiday.getId();
  }
}
