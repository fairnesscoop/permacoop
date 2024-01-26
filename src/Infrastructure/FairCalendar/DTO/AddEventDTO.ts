import { IsNotEmpty, IsDateString } from 'class-validator';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';
import { AbstractEventDTO } from './AbstractEventDTO';

export class AddEventDTO extends AbstractEventDTO {
  @IsNotEmpty()
  @IsDateString()
  public startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('startDate')
  public endDate: string;
}
