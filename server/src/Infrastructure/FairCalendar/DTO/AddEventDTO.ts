import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';
import { AbstractEventDTO } from './AbstractEventDTO';

export class AddEventDTO extends AbstractEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('startDate')
  public endDate: string;
}
