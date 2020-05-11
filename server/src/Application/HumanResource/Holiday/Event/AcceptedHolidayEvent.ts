import {IEvent} from 'src/Application/IEvent';
import {Holiday} from 'src/Domain/HumanResource/Holiday/Holiday.entity';

export class AcceptedHolidayEvent implements IEvent {
  constructor(public readonly holiday: Holiday) {}
}
