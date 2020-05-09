import {Holiday, HolidayStatus} from '../Holiday.entity';
import {User} from '../../User/User.entity';

export class CanHolidayBeModerated {
  public isSatisfiedBy(holiday: Holiday, user: User): boolean {
    return (
      holiday.getStatus() === HolidayStatus.PENDING &&
      holiday.getUser().getId() !== user.getId()
    );
  }
}
