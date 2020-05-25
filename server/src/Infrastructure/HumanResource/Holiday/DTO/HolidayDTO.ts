import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBooleanString
} from 'class-validator';
import {HolidayLeaveType} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {DateGreaterOrEqualThan} from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class HolidayDTO {
  @ApiProperty({enum: HolidayLeaveType})
  @IsNotEmpty()
  @IsEnum(HolidayLeaveType)
  public leaveType: HolidayLeaveType;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  public startDate: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty()
  public startsAllDay: string;

  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('startDate')
  @ApiProperty()
  public endDate: string;

  @IsNotEmpty()
  @IsBooleanString()
  @ApiProperty()
  public endsAllDay: string;

  @IsOptional()
  @ApiPropertyOptional()
  public comment: string;
}
